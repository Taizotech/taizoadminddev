
import StickyHeadTable from "./company_details_table";

import style from "./home.module.css";

const KycVerify = () => {
  return (
    <>
      <div className={`${style.home_wrp}`}>
        <div className="">
          <StickyHeadTable />
          {/* <InvoiceForm /> */}
        </div>
      </div>
    </>
  );
};

export default KycVerify;
