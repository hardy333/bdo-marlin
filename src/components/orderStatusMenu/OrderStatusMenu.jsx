import useOrderStatuses from "../../hooks/api/useOrderStatuses";
import AsyncMenu from "../asyncMenu/AsyncMenu";
import { getColorByOrderStatus } from "./orderStatusColors";
import { format, getHours, getMinutes } from "date-fns";
import { contentLi } from "./orderStatusMenu.module.css";


const OrderStatusMenu = ({ statusName, orderID }) => {
  const { refetch, data, isLoading, isError } = useOrderStatuses(orderID);
  let menuContent = null;
  
  
  if (data && data?.length > 0) {
    menuContent = (
      <>
        {[...data]?.reverse()?.map((status) => {
          return (
            <li className={`${contentLi} `} key={status.id} >
              <span>{status.statusName},</span>
              <span style={{ marginLeft: "auto" }}>
                {getHours(new Date(status.date))}:
                {String(getMinutes(new Date(status.date))).padStart(2, "0")},
              </span>
              <span>{format(new Date(status.date), "dd/MM/yyyy")}</span>
            </li>
          );
        })}
      </>
    );
  }

  console.log({data})

  if (data?.length === 0) {
    menuContent = (
      <p style={{ textAlign: "center" }}>სტატუსების ისტორია არ მოიძებნა.</p>
    );
  }


  return (
    <AsyncMenu
      menuContent={menuContent}
      labelText={statusName}
      menuColor={getColorByOrderStatus(statusName)}
      isLoading={isLoading}
      data={data}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default OrderStatusMenu;
