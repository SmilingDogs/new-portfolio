import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, sectionName, ...classNames) =>
  function HOC() {
    return (
      <div
        id={sectionName}
        className={`app__container ${classNames.join(" ")}`}
      >
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />
        </div>
        <NavigationDots active={sectionName} />
      </div>
    );
  };

export default AppWrap;
