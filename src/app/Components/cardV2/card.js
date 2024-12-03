// components/MembershipCard.js
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Avatar } from "@nextui-org/react";
import ColorPickerNew from '../ColorPicker/ColorPicker';
import { useColor } from "react-color-palette";
import Head from 'next/head';
import ColorThief from 'colorthief';

const rgbToHex = (r, g, b) => {
  const toHex = (x) => {
    const hex = x.toString(16); // Converte para hexadecimal
    return hex.length === 1 ? '0' + hex : hex; // Adiciona zero à esquerda se necessário
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`; // Retorna o código hex final
};

const MembershipCard = () => {
  const [openPicker, setOpenPicker] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [color, setColor] = useColor("#f3bc02");
  const [colorText, setTextColor] = useColor("#000000");
  const [colorSecondary, setColorSecondary] = useColor("#562A5E");
  const [qrCodeColor, setQRCodeColor] = useColor("#ffffff");
  const [colors, setColors] = useState([]);
  const [dominantColor, setDominantColor] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
      extractColors(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const extractColors = async (imageSrc) => {
    try {
      const image = new Image();
      image.src = imageSrc;

      // Aguardar a imagem carregar
      image.onload = () => {
        const colorThief = new ColorThief(); // Criar instância do ColorThief
        const color = colorThief.getColor(image); // Cor dominante
        setDominantColor(color);

        const palette = colorThief.getPalette(image, 5); // 10 cores da paleta
        setColors(palette.map(color => rgbToHex(color[0], color[1], color[2])));
      };
    } catch (error) {
      console.error('Error extracting colors:', error);
    }
  };

  useEffect(() => {
    if (colors) {
      console.log("colors", colors);
    }
  }, [colors]);

  const handleCopyToClipboard = (color) => {
    navigator.clipboard.writeText(color)
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Left side controls */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h3>Logo</h3>
          <input type="file" onChange={handlePhotoUpload} />

          {photo && colors.length > 0 && (
          <div>
            <h3>Paleta de Cores</h3>
            <div style={{ display: 'flex' }}>
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleCopyToClipboard(color)}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: color,
                    margin: '5px',
                  }}
                />
              ))}
            </div>
          </div>
        )}

          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <div>
                <h3>Main Color</h3>
                <button
                  onClick={() => setOpenPicker("main")}
                  className="rounded-full w-6 h-6"
                  style={{ backgroundColor: color.hex }}
                ></button>
              </div>
              <div>
                <h3>Secondary Color</h3>
                <button
                  onClick={() => setOpenPicker("colorSecondary")}
                  className="rounded-full w-6 h-6"
                  style={{ backgroundColor: colorSecondary.hex }}
                ></button>
              </div>
              <div>
                <h3>Text Color</h3>
                <button
                  onClick={() => setOpenPicker("text")}
                  className="rounded-full w-6 h-6"
                  style={{ backgroundColor: colorText.hex }}
                ></button>
              </div>
              <div>
                <h3>QRCode Color</h3>
                <button
                  onClick={() => setOpenPicker("qrcode")}
                  className="rounded-full w-6 h-6"
                  style={{ backgroundColor: qrCodeColor.hex }}
                ></button>
              </div>

              
            </div>
            {openPicker && (
              <ColorPickerNew
                color={openPicker === 'main' ? color : openPicker === 'colorSecondary' ? colorSecondary : openPicker === 'qrcode' ? qrCodeColor : colorText}
                setColor={openPicker === 'main' ? setColor : openPicker === 'colorSecondary' ? setColorSecondary : openPicker === 'qrcode' ? setQRCodeColor : setTextColor}
              />
            )}
          </div>
        </div>

        {/* Card Preview */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div
            className="w-[320px] h-[200px] p-4 bg-cover bg-center rounded-lg relative overflow-hidden"
            style={{ backgroundColor: color.hex }}
          >
            {photo && (
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url(${photo})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            )}

            <div className="relative z-10 h-full flex flex-col justify-between" style={{color: colorText.hex  }}>
              <div className="flex items-start justify-between space-x-2 h-[70%]">
                <div className="flex items-center space-x-4 h-full">
                  <div className="font-cursive text-base">
                    <p className="px-2.5">UM DE NOS</p>
                  </div>
                  
                </div>
              </div>

              <div className="flex justify-between items-center h-[30%]">
                <div className={`border-4 border rounded-full p-1`} style={{borderColor: colorSecondary.hex}}>
                    <Avatar size="lg" src={photo} />
                  </div>
                <h1>1918</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <div
            className="w-[320px] h-[200px] p-4 bg-cover bg-center rounded-lg relative overflow-hidden"
            style={{ backgroundColor: color.hex }}
          >
            {photo && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(${photo})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            )}

            <div className="relative z-10 h-full flex flex-col justify-between" style={{color: colorText.hex  }}>
              <div className="flex items-start justify-between space-x-2 h-[70%]">
                <div className="flex items-start space-x-2 h-full">
                <p className="text-[8px] writing-mode-vertical text-center transform -rotate-90">Sócio</p>

                  <div
                    className="h-20 w-14 bg-cover bg-center rounded"
                    style={{
                      backgroundImage: `url('https://www.cdnacional.pt/wp-content/uploads/2024/08/site_2425_soumare-270x370.png')`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center space-x-4 h-full">
                  <div className="font-cursive text-base">
                    <p className="px-2.5">Não há gente como nós</p>
                  </div>
                  <div className={`border-4 border rounded-full p-1`} style={{borderColor: colorSecondary.hex}}>
                    <Avatar size="lg" src={photo} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center h-[30%]">
                <div className="text-xs space-y-1">
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: colorSecondary.hex }}>Nome:</h3>
                    <p>João Miguel Coelho Jorge</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: colorSecondary.hex }}>Nº Sócio:</h3>
                    <p>615</p>
                  </div>
                </div>
                <QRCodeSVG fgColor={qrCodeColor.hex} height={65} width={65} value="https://example.com" bgColor={color.hex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipCard;
