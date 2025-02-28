import contextlib
import shutil
import tempfile
import textwrap
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import AbstractSet, Optional  # noqa: UP035

from dagster import AssetKey, DagsterInstance
from dagster._utils import pushd
from dagster_components.core.component import (
    Component,
    ComponentDeclNode,
    ComponentLoadContext,
    ComponentTypeRegistry,
)


def registry() -> ComponentTypeRegistry:
    return ComponentTypeRegistry.from_entry_point_discovery()


def script_load_context(decl_node: Optional[ComponentDeclNode] = None) -> ComponentLoadContext:
    return ComponentLoadContext.for_test(registry=registry(), decl_node=decl_node)


def get_asset_keys(component: Component) -> AbstractSet[AssetKey]:
    return {
        key
        for key in component.build_defs(ComponentLoadContext.for_test())
        .get_asset_graph()
        .get_all_asset_keys()
    }


def assert_assets(component: Component, expected_assets: int) -> None:
    defs = component.build_defs(ComponentLoadContext.for_test())
    assert len(defs.get_asset_graph().get_all_asset_keys()) == expected_assets
    result = defs.get_implicit_global_asset_job_def().execute_in_process(
        instance=DagsterInstance.ephemeral()
    )
    assert result.success


def generate_component_lib_pyproject_toml(name: str, is_code_location: bool = False) -> str:
    pkg_name = name.replace("-", "_")
    base = textwrap.dedent(f"""
        [build-system]
        requires = ["setuptools", "wheel"]
        build-backend = "setuptools.build_meta"

        [project]
        name = "{name}"
        version = "0.1.0"
        dependencies = [
            "dagster-components",
        ]

        [project.entry-points]
        "dagster.components" = {{ {pkg_name} = "{pkg_name}.lib"}}

        [tool.dg]
        is_component_lib = true

    """)
    if is_code_location:
        return base + textwrap.dedent("""
        is_code_location = true

        [tool.dagster]
        module_name = "{ pkg_name }.definitions"
        project_name = "{ pkg_name }"
        """)
    else:
        return base


@contextmanager
def temp_code_location_bar() -> Iterator[None]:
    with TemporaryDirectory() as tmpdir, pushd(tmpdir):
        Path("bar/bar/lib").mkdir(parents=True)
        Path("bar/bar/components").mkdir(parents=True)
        with open("bar/pyproject.toml", "w") as f:
            f.write(generate_component_lib_pyproject_toml("bar", is_code_location=True))
        Path("bar/bar/__init__.py").touch()
        Path("bar/bar/definitions.py").touch()
        Path("bar/bar/lib/__init__.py").touch()

        with pushd("bar"):
            yield


def _setup_component_in_folder(
    src_path: str, dst_path: str, local_component_defn_to_inject: Optional[Path]
) -> None:
    origin_path = Path(__file__).parent / "integration_tests" / "components" / src_path

    shutil.copytree(origin_path, dst_path, dirs_exist_ok=True)
    if local_component_defn_to_inject:
        shutil.copy(local_component_defn_to_inject, Path(dst_path) / "__init__.py")


@contextlib.contextmanager
def inject_component(
    src_path: str, local_component_defn_to_inject: Optional[Path]
) -> Iterator[str]:
    with tempfile.TemporaryDirectory() as tmpdir:
        _setup_component_in_folder(src_path, tmpdir, local_component_defn_to_inject)
        yield tmpdir


@contextlib.contextmanager
def create_code_location_from_components(
    *src_paths: str, local_component_defn_to_inject: Optional[Path] = None
) -> Iterator[Path]:
    """Scaffolds a code location with the given components in a temporary directory,
    injecting the provided local component defn into each component's __init__.py.
    """
    with tempfile.TemporaryDirectory() as tmpdir:
        code_location_dir = Path(tmpdir) / "my_location"
        code_location_dir.mkdir()
        with open(code_location_dir / "pyproject.toml", "w") as f:
            f.write(generate_component_lib_pyproject_toml("my_location", is_code_location=True))

        for src_path in src_paths:
            component_name = src_path.split("/")[-1]

            components_dir = code_location_dir / "my_location" / "components" / component_name
            components_dir.mkdir(parents=True, exist_ok=True)

            _setup_component_in_folder(
                src_path=src_path,
                dst_path=str(components_dir),
                local_component_defn_to_inject=local_component_defn_to_inject,
            )

        yield code_location_dir
