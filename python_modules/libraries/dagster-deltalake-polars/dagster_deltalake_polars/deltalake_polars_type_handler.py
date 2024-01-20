from typing import Any, Dict, Optional, Sequence, Tuple, Type, Union

import polars as pl
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

PolarsTypes = Union[pl.DataFrame, pl.LazyFrame]


class DeltaLakePolarsTypeHandler(DeltalakeBaseArrowTypeHandler[PolarsTypes]):
    def from_arrow(
        self, obj: Union[ds.Dataset, pa.RecordBatchReader], target_type: Type[PolarsTypes]
    ) -> PolarsTypes:
        if isinstance(obj, pa.RecordBatchReader):
            df = pl.DataFrame(obj.read_all())
            if target_type == pl.LazyFrame:
                ## Maybe allow this but raise a warning that the data has been sliced earlier otherwise it
                ## would have received a ds.dataset
                return df.lazy()
            else:
                return df
        df = pl.scan_pyarrow_dataset(obj)
        if target_type == pl.DataFrame:
            return df.collect()
        else:
            return df

    def to_arrow(self, obj: PolarsTypes) -> Tuple[pa.RecordBatchReader, Dict[str, Any]]:
        if isinstance(obj, pl.LazyFrame):
            obj = obj.collect()
        return obj.to_arrow().to_reader(), {"large_dtypes": True}

    @property
    def supported_types(self) -> Sequence[Type[object]]:
        return [pl.DataFrame, pl.LazyFrame]


class DeltaLakePolarsIOManager(DeltaLakeIOManager):
    @staticmethod
    def type_handlers() -> Sequence[DbTypeHandler]:
        return [DeltaLakePolarsTypeHandler(), DeltaLakePyArrowTypeHandler()]

    @staticmethod
    def default_load_type() -> Optional[Type]:
        return pl.DataFrame
