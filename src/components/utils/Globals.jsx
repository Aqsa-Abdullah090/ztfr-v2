
// import EmailLoginFix from "../common/EmailLoginFix";
// import CookiesProvider from "../cookies/CookiesProvider";
// import NoInternetProvider from "../no-internet/NoInternetProvider";
// import FileDownloadProvider from "../providers/FileDownloadProvider";
// import PrivacyProvider from "../providers/PrivacyProvider";
// import TransfersProvider from "../sidebar-right/TransfersProvider";
// import TermPrivacyProvider from "../terms-and-privacy/TermPrivacyProvider";
// import CountriesWrapper from "./CountriesWrapper";

import APIPagination from "../primitives/APIPagination";

function Globals() {
  return (
    <>
      {/* <NoInternetProvider />
      <CookiesProvider />
      <TermPrivacyProvider />
      <TransfersProvider />
      <CountriesWrapper /> */}
      <APIPagination />
      {/* <EmailLoginFix />
      <FileDownloadProvider />
      <PrivacyProvider /> */}
    </>
  );
}
export default Globals;
