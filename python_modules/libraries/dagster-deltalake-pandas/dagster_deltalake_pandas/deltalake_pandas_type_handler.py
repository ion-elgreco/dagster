from typing import Any, Dict, Optional, Sequence, Tuple, Type, Union

import pandas as pd
import pyarrow as pa
import pyarrow.dataset as ds
from dagster._core.storage.db_io_manager import (
    DbTypeHandler,
)
from dagster_deltalake.handler import (
    DeltalakeBaseArrowTypeHandler,
    DeltaLakePyArrowTypeHandler,
)
from dagster_deltalake.io_manager import DeltaLakeIOManager


class DeltaLakePandasTypeHandler(DeltalakeBaseArrowTypeHandler[pd.DataFrame]):
    def from_arrow(
        self, obj: Union[ds.dataset, pa.RecordBatchReader], target_type: Type[pd.DataFrame]
    ) -> pd.DataFrame:
        if isinstance(obj, ds.Dataset):
            obj = obj.scanner().to_reader()
        return obj.read_pandas()

    def to_arrow(self, obj: pd.DataFrame) -> Tuple[pa.RecordBatchReader, Dict[str, Any]]:
        return pa.Table.from_pandas(obj).to_reader(), {}

    @property
    def supported_types(self) -> Sequence[Type[object]]:
        return [pd.DataFrame]


class DeltaLakePandasIOManager(DeltaLakeIOManager):
    @staticmethod
    def type_handlers() -> Sequence[DbTypeHandler]:
        return [DeltaLakePandasTypeHandler(), DeltaLakePyArrowTypeHandler()]

    @staticmethod
    def default_load_type() -> Optional[Type]:
        return pd.DataFrame
