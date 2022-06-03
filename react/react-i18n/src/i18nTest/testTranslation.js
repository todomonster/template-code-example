import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const MyComponent = () => {
   const { t, i18n } = useTranslation();

   const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
   };

   return (
      <div className="App">
         <header className="App-header">
            <h1>{t("hello")}</h1>
            <Trans i18nKey="link">
               一起來
               <a
                  href="https://reactjs.org"
                  target="_blank"
               >
                  這裡
               </a>
               學習 React 吧
            </Trans>
            <div>
               <button onClick={() => changeLanguage("zh-tw")}>中文</button>
               <button onClick={() => changeLanguage("en")}>English</button>
               <button onClick={() => changeLanguage("es")}>Español</button>
               <button onClick={() => changeLanguage("jp")}>日本語</button>
            </div>
         </header>
      </div>
   );
};

function App() {
   return (
      <Suspense fallback="loading">
         <MyComponent />
      </Suspense>
   );
}

export default App;