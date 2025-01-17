import {
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

function Transformer() {
  const [transformation, setTransformation] = useState("wgs84tolv95");

  const [easting, setEasting] = useState(0);
  const [northing, setNorthing] = useState(0);

  const [newEasting, setNewEasting] = useState(0.0);
  const [newNorthing, setNewNorthing] = useState(0.0);

  async function transform() {
    try {
      const resp = await fetch(
        `https://geodesy.geo.admin.ch/reframe/${transformation}?northing=${northing}&easting=${easting}`
      );
      const json = await resp.json();
      if (resp.ok) {
        setNewEasting(json.coordinates[0]);
        setNewNorthing(json.coordinates[1]);
      } else {
        throw new Error("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="box">
      <Typography variant="h4" gutterBottom>
        Coordinate Transform
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel id="reframe-label">REFRAME Service</InputLabel>
          <Select
            label="REFRAME Service"
            fullWidth
            value={transformation}
            onChange={(e) => setTransformation(e.target.value)}
          >
            <MenuItem value="wgs84tolv95">WGS84 toas LV95</MenuItem>
            <MenuItem value="lv95towgs84">LV95 to WGS84</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <TextField
            label="Easting"
            fullWidth
            onChange={(e) => setEasting(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Northing"
            fullWidth
            onChange={(e) => setNorthing(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={transform}>
            Transform
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Transformed X"
            fullWidth
            disabled
            value={newEasting}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Transformed Y"
            fullWidth
            disabled
            value={newNorthing}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Transformer;
