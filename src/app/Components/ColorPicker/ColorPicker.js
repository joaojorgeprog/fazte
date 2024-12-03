import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function ColorPickerNew({color, setColor}) {

  return <div style={{maxWidth: '200px'}}><ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor} /></div>;
}