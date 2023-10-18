import { Device, Gps } from "@/models";
import http from "@/utils/http";

export async function fetchDevices() {
  try {
    const res = await http.get<Device[]>("/devices");
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchGpsByDeviceId(deviceId: string) {
  try {
    const res = await http.get<Gps[]>("/gps/"+deviceId);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];

  }
}
