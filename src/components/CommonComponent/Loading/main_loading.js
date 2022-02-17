//images
import AuthLoadingWhite from "../../../assets/Authentication/Loading/auth_loading.gif";

export default function Loading() {
  return (
    <div className="grid place-items-center h-screen bg-black">
      <div className="space-y-2">
        <img
          src={AuthLoadingWhite}
          className="w-8 h-auto mx-auto"
          alt="MainLoadingGif"
        />
        <p className="secondary-font text-color-white">Loading ....</p>
      </div>
    </div>
  );
}
