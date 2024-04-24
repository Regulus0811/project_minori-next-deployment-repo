import {ChangeEvent, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import postMaterial from '@/src/api/material/postMaterial';
import patchMaterial from '@/src/api/material/patchMaterial';
import {FormProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar/prompt';

const MaterialForm = ({setIsOpen, editData, cId}: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [materialName, setMaterialName] = useState<string>('');
  const [material, setMaterial] = useState<File>();

  useEffect(() => {
    if (editData) {
      setMaterialName(editData.name);
    }
  }, []);

  const handleEnterName = (e: ChangeEvent<HTMLInputElement>) => {
    setMaterialName(e.target.value);
  };

  const handleClickInput = () => {
    inputRef.current?.click();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMaterial(file[0]);
    }
  };

  const handleClickButton = () => {
    console.log(material, materialName);
    if (material && materialName) {
      postMaterial(4, materialName, material).then(() => {
        setIsOpen(false);
      });
    } else {
      alert('모든 항목을 입력해주세요');
    }
  };

  const handleClickEdit = () => {
    console.log('edit');
    if (editData)
      patchMaterial(
        parseInt(cId),
        parseInt(editData.id),
        material,
        materialName
      ).then(() => {
        setIsOpen(false);
      });
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className=" bg-white rounded-lg w-2/5 h-3/4 py-10 box-border">
          <div className="w-full h-full flex box-border px-10">
            <div className="flex flex-col space-y-4 h-full w-full">
              <div>
                <div className="text-3xl font-bold">프롬프트 생성</div>
                <div className="text-gray-500 py-1">
                  파일을 추가하면 다음과 같은 메시지가 표시됩니다. 파일이
                  추가되었습니다.
                </div>
              </div>
              <div className="py-1">
                <div className="pb-2 font-semibold">프롬프트명</div>
                <input
                  type="text"
                  className="w-full border-2 p-2 rounded"
                  placeholder="프롬프트 명을 입력해주세요"
                  value={materialName}
                  onChange={handleEnterName}
                />
              </div>
              <div className="flex flex-col h-2/3">
                <div className="pb-2 font-semibold">파일 추가</div>
                <div
                  className="w-full h-2/3 flex items-center justify-center bg-gray-50 text-center p-8 border-dashed border-2 border-gray-300"
                  onClick={handleClickInput}
                >
                  <div>
                    <div className="pb-4">
                      <Image
                        src={icons.cloud}
                        alt="cloud"
                        width={60}
                        height={60}
                        className="m-auto "
                      />
                    </div>
                    <div className="font-medium">
                      파일이나 링크를 추가해주세요
                    </div>
                    <div className="text-xs text-gray-400">
                      지원하는 파일 형식: PDF, Word, PPT
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <button
                  className="bg-gray-100 py-2 px-4  rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {'< '}뒤로가기
                </button>
                {editData ? (
                  <button
                    className="bg-indigo-600 text-white py-2 px-3 rounded"
                    onClick={handleClickEdit}
                  >
                    프롬프트 수정
                  </button>
                ) : (
                  <button
                    className="bg-indigo-600 text-white py-2 px-3 rounded"
                    onClick={handleClickButton}
                  >
                    프롬프트 생성
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
