import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Input, Button } from '../../components';
import images from '../../assets';

import { NFTContext } from '../../context/NFTContext';

const createNft = () => {
  // take the global value from context
  const { uploadToIPFS } = useContext(NFTContext);
  const [fileUrl, setFileURl] = useState();
  const [formInput, setformInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const { theme } = useTheme();

  // when file is droped on the image uploader
  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log(url);
    setFileURl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 1048576,

  });
  const filestyles = useMemo(() => `dark:bg-w-black-1 bg-white border dark:border-white border-w-grey-2 flex flex-col item-center p-5 rounded-sm border-dashed cursor-pointer
    
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}`, [isDragAccept, isDragActive, isDragReject]);
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="md:w-full w-4/5">
        <h1 className="font-poppins text-color text-2xl minlg:text-4xl font-semibold ml-4 sx:ml-0">
          Create NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins text-color font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={filestyles}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center ">
                <p className='className="font-poppins text-color font-semibold text-xl'>
                  JPG, PNG, GIF, WEBP. Max 100MB.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    alt="upload"
                    width={100}
                    height={100}
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <p className='className="font-poppins text-color font-semibold text-sm'>
                  Drag and Drop file
                </p>
                <p className='className="font-poppins text-color font-semibold text-sm mt-2'>
                  Or browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          type="input"
          title="Name"
          placeholder="NFT name"
          handleClick={(e) => setformInput({ ...formInput, name: e.target.value })}
        />
        <Input
          type="textarea"
          title="Description"
          placeholder="Describe something about your NFT"
          handleClick={(e) => setformInput({ ...formInput, description: e.target.value })}
        />
        <Input
          type="number"
          title="Price"
          placeholder="Price"
          handleClick={(e) => setformInput({ ...formInput, price: e.target.value })}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            className="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default createNft;
