from typing import Any, Dict, Optional, Sequence, Tuple, Type, Mapping

import pandas as pd
import pyarrow as pa
from dagster._core.storage.db_io_manager import (
    DbTypeHandler,
)
from dagster_deltalake.handler import (
    DeltalakeBaseArrowTypeHandler,
    DeltaLakePyArrowTypeHandler,
)
from dagster import MetadataValue
from dagster_deltalake.io_manager import DeltaLakeIOManager


class DeltaLakePandasTypeHandler(DeltalakeBaseArrowTypeHandler[pd.DataFrame]):
    def from_arrow(
        self, obj: pa.RecordBatchReader, target_type: Type[pd.DataFrame]
    ) -> pd.DataFrame:
        return obj.read_pandas()

    def to_arrow(self, obj: pd.DataFrame) -> Tuple[pa.RecordBatchReader, Dict[str, Any]]:
        return pa.Table.from_pandas(obj).to_reader(), {}

    @property
    def supported_types(self) -> Sequence[Type[object]]:
        return [pd.DataFrame]

    def get_output_stats(self, obj: pd.DataFrame) -> Mapping[str, MetadataValue]:
        stats = {"source_num_rows": MetadataValue.int(obj.shape[0])}
        return stats


class DeltaLakePandasIOManager(DeltaLakeIOManager):
    @staticmethod
    def type_handlers() -> Sequence[DbTypeHandler]:
        return [DeltaLakePandasTypeHandler(), DeltaLakePyArrowTypeHandler()]

    @staticmethod
    def default_load_type() -> Optional[Type]:
        return pd.DataFrame
