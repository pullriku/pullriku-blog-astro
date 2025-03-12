import fs from "node:fs";
import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import "../styles/global.css";

export default async function DefaultOgpImage(): Promise<Buffer> {
    const width = 1200;
    const height = 630;
    const bgImage = fs.readFileSync("src/assets/og_image.jpeg", {
        encoding: "base64",
    });
    const logoImage = fs.readFileSync("src/assets/rikusblog_light.png", {
        encoding: "base64",
    });

    const imageComponent = (
        <main
            style={{
                height: "100%",
                width: "100%",
                position: "relative",
                fontFamily:
                    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            }}
        >
            <img
                src={`data:image/jpeg;base64,${bgImage}`}
                alt="og_image"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                }}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "95%",
                    height: "30%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    position: "absolute",
                    bottom: "2.5%",
                    left: "2.5%",
                    borderRadius: "30px",
                }}
            >
                {/* <p
                    style={{
                        // position: "absolute",
                        textAlign: "left",
                        // top: "2.5%",
                        // left: "2.5%",
                        margin: "2.5%",
                        height: "70%",
                        width: "95%",
                        // backgroundColor: "red",
                        fontSize: "4rem",
                        overflow: "hidden",
                    }}
                >
                </p> */}
                <div
                    style={{
                        display: "flex",
                        margin: "0 auto",
                        // position: "absolute",
                        width: "90%",
                        height: "25%",
                        // bottom: "1%",
                        marginBottom: "2.5%",
                        // backgroundColor: "green",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={`data:image/png;base64,${logoImage}`}
                        style={{
                            position: "absolute",
                            //aspect

                            objectFit: "cover",
                            alignItems: "center",
                        }}
                    />
                </div>
            </div>
        </main>
    );

    const options: SatoriOptions = {
        width,
        height,
        // fonts: [
        //     {
        //         name: "Noto Sans JP",
        //         data: titleFont,
        //         weight: 700,
        //         style: "normal",
        //     },
        // ],
        fonts: [],
    };

    const svg = await satori(imageComponent, options);

    const resvg = new Resvg(svg, {
        font: {
            loadSystemFonts: false,
        },
        fitTo: {
            mode: "width",
            value: width,
        },
    });

    const image = resvg.render();
    return image.asPng();
}
