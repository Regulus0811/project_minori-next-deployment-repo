// import {useEffect, useState} from 'react';
import {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useSetRecoilState} from 'recoil';
// import MaterialForm from './MaterialForm';
// import deleteMaterial from '@/src/api/material/deleteMaterial';
import postPromptAccess from '@/src/api/prompts/postPromptAccess';
import materialState from '@/src/recoil/atoms/materialState';
// import userState from '@/src/recoil/atoms/userState';
import {Material} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const MaterialList = ({
  materials,
  cId,
  mId,
}: {
  materials: Material[];
  cId: string;
  mId: string;
}) => {
  // const [isToggleOpen, setIsToggleOpen] = useState<boolean[]>([]);
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [editData, setEditData] = useState<Material>();
  // const user = useRecoilValue(userState);
  const setMaterialState = useSetRecoilState(materialState);

  useEffect(() => {
    // setIsToggleOpen(new Array(materials.length).fill(false));
  }, [materials]);

  // 現在エラーが発生して修正中
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     document.addEventListener('click', handleOutsideClick);

  //     return () => {
  //       document.removeEventListener('click', handleOutsideClick);
  //     };
  //   }
  // }, []);

  // const handleOutsideClick = (event: MouseEvent) => {
  //   const moreHorizIcon = document.getElementById('more-horiz-icon');
  //   const modalContainer = document.getElementById('modal-container');
  //   if (modalContainer && !modalContainer.contains(event.target as Node)) {
  //     if (moreHorizIcon && !moreHorizIcon.contains(event.target as Node)) {
  //       console.log('click');
  //       closeDropdown();
  //     }
  //   }
  // };

  const handleClickSubject = (mId: number) => {
    const material = materials.find(material => material.id === String(mId));
    if (material?.prompts.length === 0 && cId) {
      postPromptAccess(parseInt(cId), mId).then(res => {
        setMaterialState({
          ...material,
          prompts: [...(material?.prompts || []), {id: res.data}],
        });
      });
    }
  };

  // const toggleDropdown = (index: number) => {
  //   console.log(index);
  //   setIsToggleOpen(prev =>
  //     prev.map((open, i) => (i === index ? !open : open))
  //   );
  // };

  // const closeDropdown = () => {
  //   setIsToggleOpen(prev => prev.map(() => false));
  // };

  // const handleMaterialDelete = (mId: number) => {
  //   if (cId) {
  //     deleteMaterial(parseInt(cId), mId);
  //     location.reload();
  //   }
  // };

  return (
    // <div>
    //   <ul>
    //     {materials.map((material, index) => {
    //       return (
    //         <li className="relative flex mb-2 py-1 items-center" key={index}>
    //           <Image
    //             src={icons.book}
    //             alt="prompt"
    //             width={30}
    //             height={30}
    //             className="mr-3"
    //           ></Image>
    //           <div className="flex w-full items-center justify-between">
    //             <div onClick={() => handleClickSubject(parseInt(material.id))}>
    //               <Link href={`/classes/${cId}/${material.name}`}>
    //                 <div
    //                   className="min-h-[30px] flex items-center"
    //                   onClick={() => setMaterialState(material)}
    //                 >
    //                   {material.name}
    //                 </div>
    //               </Link>
    //             </div>
    //             {user.role_id === 'ADMIN' ? (
    //               <Image
    //                 src={icons.moreHoriz}
    //                 alt="icon"
    //                 width={30}
    //                 height={30}
    //                 onClick={() => toggleDropdown(index)}
    //                 id="more-horiz-icon"
    //               ></Image>
    //             ) : null}
    //           </div>
    //           {isToggleOpen[index] ? (
    //             <div
    //               className="absolute top-[32px] right-0 z-20 bg-white rounded-lg overflow-hidden drop-shadow-lg"
    //               id="modal-container"
    //             >
    //               <div
    //                 className="p-2 hover:bg-gray-200"
    //                 onClick={() => {
    //                   setEditData(material);
    //                   setIsOpen(true);
    //                   setIsToggleOpen(prev => prev.map(() => false));
    //                 }}
    //               >
    //                 Edit Material
    //               </div>
    //               <div
    //                 className="p-2 hover:bg-gray-200"
    //                 onClick={() => {
    //                   handleMaterialDelete(parseInt(material.id));
    //                 }}
    //               >
    //                 Delete
    //               </div>
    //             </div>
    //           ) : null}
    //         </li>
    //       );
    //     })}
    //     {isOpen && cId ? (
    //       <MaterialForm setIsOpen={setIsOpen} editData={editData} cId={cId} />
    //     ) : null}
    //   </ul>
    // </div>
    <div className="grid gap-3">
      {materials.map((material, index) => {
        return (
          <div
            className={`flex items-center ${
              // eslint-disable-next-line eqeqeq
              material.name == mId ? 'bg-blue-300 text-black' : null
            } rounded-full`}
            key={index}
          >
            <Image
              src={icons.book}
              alt="prompt"
              width={30}
              height={30}
              className="w-6 h-6 mx-3 my-1 rounded-full"
            ></Image>
            <div onClick={() => handleClickSubject(parseInt(material.id))}>
              <Link href={`/classes/${cId}/${material.name}`}>
                <div
                  className="min-h-[30px] flex items-center"
                  onClick={() => setMaterialState(material)}
                >
                  {material.name}
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MaterialList;
