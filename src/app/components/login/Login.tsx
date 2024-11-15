import Image from 'next/image';
import getGoogleLogin from '@/src/api/auth/getGoogleLogin';
import svgs from '@/public/svgs/login';
import getLineLogin from '@/src/api/auth/getLineLogin';

const Login = () => {
  const handleClickGoogle = () => {
    getGoogleLogin().then(res => {
      if (res.url) {
        window.location.href = res.url;
      } else {
        console.log(res);
        console.error('URL not received');
      }
    });
  };

  const handleClickLine = () => {
    getLineLogin().then(res => {
      if (res.url) {
        window.location.href = res.url;
      } else {
        console.log(res);
        console.error('URL not received');
      }
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" bg-white rounded-lg w-[750px] h-[530px] py-10 box-border"
        id="modal-container"
      >
        <div className="w-full h-full flex items-center box-border py-8">
          {/* LEFT */}
          <div className="w-3/5 h-full text-center flex flex-col justify-between ">
            <div>
              <div className="text-4xl font-semibold leading-tight">
                ミノリで学びを
                <br /> 始めましょう！
              </div>
              <div className="text-sm text-neutral-400 py-2">
                ソーシャルログインで簡単に楽しめます。
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <Image
                src={svgs.login}
                alt="logo"
                width={370}
                height={258}
                style={{width: 370, height: 258}}
              />
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-2/5 h-full flex justify-center">
            <div className="w-4/5 text-sm h-full flex flex-col justify-between">
              <div className="flex justify-center">
                <Image
                  src={svgs.logo}
                  alt="logo"
                  width={250}
                  height={250}
                  className="w-full "
                />
              </div>
              <div className="my-5">
                <button
                  className="block border-2 w-full flex items-center justify-between px-6 py-2 m-auto my-3 rounded-lg"
                  onClick={handleClickGoogle}
                >
                  <Image
                    src={svgs.google}
                    alt="google"
                    width={25}
                    height={25}
                  />
                  <div className="ml-2 text-center w-full">
                    Googleでログイン
                  </div>
                </button>
                <button
                  className="block border-2 w-full flex items-center justify-between px-6 py-2 m-auto my-3 rounded-lg"
                  onClick={handleClickLine}
                >
                  <Image src={svgs.line} alt="google" width={25} height={25} />
                  <div className="ml-2 text-center w-full">Lineでログイン</div>
                </button>
              </div>
              <div className="w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
