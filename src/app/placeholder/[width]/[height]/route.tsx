import { ImageResponse } from "next/og";

export async function GET(
  _: Request,
  {
    params: paramsPromise,
  }: { params: Promise<{ width: string; height: string }> }
) {
  const { width, height } = await paramsPromise;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          background: "rgb(209 213 219)",
          color: "rgb(107 114 128)",
        }}
      >
        {width} x {height}
      </div>
    ),
    {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    }
  );
}
