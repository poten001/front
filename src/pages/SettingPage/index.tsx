import PencilIcon from "../../assets/icons/pencil.svg?react";
import KakaoIconTwo from "../../assets/icons/kakaoIconTwo.svg?react";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import SettingPageWaveBg from "../../assets/settingPageBg.svg?react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useLoggedIn from "../../hooks/useLoggedIn";
import axios from "axios";

const SettingPage = () => {
  const navigate = useNavigate();
  const { login, setLogin } = useLoggedIn();
  const [profile, setProfile] = useState({
    email: "로그인 후 새로운 일상 챌린지를 시작하세요",
    memberName: "비로그인",
    profileUrl: "",
  });
  const [editName, setEditName] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const accessToken = Cookies.get("accessToken");
      if (login) {
        try {
          const response = await axios.get(
            "https://today-challenge.site/member",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          const { email, memberName, profileUrl } = response.data;
          console.log("response.data", response.data);
          setProfile({ email, memberName, profileUrl });
        } catch (error) {
          console.error("프로필 정보를 가져오는 데 실패했습니다.", error);
        }
      }
    };

    getProfile();
  }, [login]);

  const handleLogOut = async () => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken", accessToken);
    try {
      await axios
        .post("https://today-challenge.site/auth/logout", null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          console.log("로그아웃 성공");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          setLogin(false);
          navigate("/");
        });
    } catch (err) {
      console.log("err 로그아웃 에러", err);
    }
  };

  const nameChangeHandler = (e) => {
    const name = e.target.value;
    setProfile((prevProfile) => {
      const updatedProfile = { ...prevProfile, memberName: name };

      console.log(updatedProfile.memberName);

      return updatedProfile;
    });
  };

  const toggleEdit = () => {
    console.log("editName", editName);
    if (editName) {
      updateUserNameHandler(profile.memberName);
    }
    setEditName(!editName);
  };

  const updateUserNameHandler = async (memberName) => {
    const body = { memberName: profile.memberName };
    const accessToken = Cookies.get("accessToken");
    console.log("body", body);

    if (memberName.trim().length <= 1) {
      return alert("닉네임은 최소 2글자부터 입니다");
    } else if (memberName.trim().length > 10) {
      return alert("닉네임은 10글자를 넘을 수 없습니다");
    }

    try {
      const response = await axios.patch(
        "https://today-challenge.site/member",
        body,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <MainLayout>
      <div className="flex w-full h-[calc(100vh-58px-80px)] flex-col bg-white">
        <div className="w-full h-[330px] flex flex-col bg-primary-500 justify-center items-center gap-3 relative">
          <img
            src={profile.profileUrl ? profile.profileUrl : "기본이미지 필요"}
            width={100}
            height={100}
            className="rounded-full bg-white"
          />

          <div className="flex flex-row items-center justify-center z-10">
            <div className="flex items-center justify-center gap-2">
              {!editName ? (
                <h2>{profile.memberName}</h2>
              ) : (
                <input
                  name="memberName"
                  value={profile.memberName || ""}
                  className="py-2px px-[4px] rounded-lg bg-white w-1/2"
                  onChange={nameChangeHandler}
                />
              )}

              <PencilIcon
                width={14}
                height={14}
                className="cursor-pointer"
                onClick={toggleEdit}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 z-10">
            <KakaoIconTwo width={18} height={18} />
            <span className="text-neutral-700">{profile.email}</span>
          </div>
          <SettingPageWaveBg className="absolute top-[-220px] left-0 w-full " />
        </div>
        <div className="w-full h-full flex flex-col text-left gap-[25px] px-5 pb-[40px] pt-[120px]">
          <div className="flex flex-col gap-[15px]">
            <p className="text-neutral-500">서비스</p>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/about-ochaelwan")}
            >
              <p className="text-neutral-700">#오챌완 소개</p>
              <ArrowIcon />
            </div>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/terms-of-service")}
            >
              <p className="text-neutral-700">서비스 이용약관</p>
              <ArrowIcon />
            </div>
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={() => navigate("/private-policy")}
            >
              <p>개인정보 처리방침</p>
              <ArrowIcon />
            </div>
          </div>

          {login && (
            <div className="flex flex-col gap-[15px]">
              <p className="text-neutral-500">회원</p>
              <p
                className="text-neutral-700 cursor-pointer"
                onClick={handleLogOut}
              >
                로그아웃
              </p>
              <p className="text-secondary-600 ">서비스 탈퇴</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingPage;
