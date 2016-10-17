# 精簡版的台灣行政區 geojson

同時轉換縣市合併後行政區名稱

## twTown1982.geo.json

原始來源 [g0v/twgeojson](https://github.com/g0v/twgeojson/blob/master/json/twTown1982.topo.json) 經過 topojson -> geojson 而來

同時手動轉換縣市合併後行政區名稱 e.g. 台北縣 -> 新北市 ...

移除 `(海)` 的 Polygon

## twTown1982.geo.tiny.min.json

從 `twTown1982.geo.json` remove null geometry Feature 以及 minify 來的
