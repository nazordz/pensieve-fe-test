import { Device, Gps } from "@/models";
import { fetchDevices, fetchGpsByDeviceId } from "@/services/GpsServices";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function groupBy<K, V>(
  list: Array<V>,
  keyGetter: (input: V) => K
): Map<K, Array<V>> {
  const map = new Map<K, Array<V>>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};



const GpsPage: React.FC = () => {
  const [deviceId, setDeviceId] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [gps, setGps] = useState<Gps[]>([]);

  async function onInit() {
    const ds = await fetchDevices();
    setDevices(ds);
  }

  const getBgColor = useMemo(() => {
    const bgColors = [];
    for (let index = 0; index < gps.length; index++) {
      const x = Math.floor(Math. random() * 256);
      const y = Math.floor(Math. random() * 256);
      const z = Math.floor(Math. random() * 256);
      const bgColor = "rgb(" + x + "," + y + "," + z + ")";
      bgColors.push(bgColor)
    }
    return bgColors;
  }, [gps])

  const chartLabels = useMemo(() => {
    return [...new Set(gps.map((g) => g.location))];
  }, [gps]);

  const chartData = useMemo(() => {
    if (gps.length == 0) {
      return [];
    }
    const data = [];
    const grouped = groupBy(gps, (x) => x.location);
    for (let index = 0; index < chartLabels.length; index++) {
      const cl = chartLabels[index];
      const gpsGroupedByLocation = grouped.get(cl);
      if (gpsGroupedByLocation) {
        const statics = (gpsGroupedByLocation.length / gps.length) * 100;
        data.push(statics);
      }
    }
    return data;
  }, [chartLabels, gps]);

  async function getGps(dId: string) {
    const gpsData = await fetchGpsByDeviceId(dId);
    setGps(gpsData);
  }

  useEffect(() => {
    if (deviceId != "") {
      getGps(deviceId);
    }
  }, [deviceId]);

  useEffect(() => {
    onInit();
  }, []);

  return (
    <Box>
      <Card >
        <CardContent>
          <FormControl sx={{ width: 240 }}>
            <InputLabel id="select-device">Device</InputLabel>
            <Select
              labelId="select-device"
              label="Device"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="Choose device"
            >
              {devices.map((d) => (
                <MenuItem key={d.device_id} value={d.device_id}>
                  {d.device_id} - {d.device_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container mt={1} spacing={2}>
            <Grid item md={4}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gps.map((g) => (
                      <TableRow key={g.id}>
                        <TableCell>
                          {dayjs(g.timestamp).format("DD-MM-YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell>{g.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={8} p={2}>
              <Paper>
                <Grid container>
                  <Grid item md={6}>
                    <Pie
                      options={options}
                      data={{
                        labels: chartLabels,
                        datasets: [
                          {
                            data: chartData,
                            label: "% Time spent on each location",
                            backgroundColor: getBgColor
                          },
                        ],
                      }}
                    />
                  </Grid>
                  <Grid item md={6} p={2}>
                    <Typography>% Time spent on each location</Typography>
                    <Stack direction="column">
                      {chartLabels.map((cl, k) => (
                        <Box key={k}>
                          <Typography color={getBgColor[k]}>{cl}: {gps.filter(x => x.location == cl)?.length / gps.length * 100}%</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GpsPage;
