import { PriceInfoType } from "@/type/ProductType";
import Image from "next/image";

const PriceInfoCard = ({ title, icon, value }: PriceInfoType) => {
  return (
    <div className="price-info_card  box-shadow">
      <p className="text-base text-gray-700">{title}</p>
      <div className="flex gap-1">
        <Image src={icon} alt={title} width={24} height={24} />
        <p className="text-2xl font-bold text-[#282828]">{value}</p>
      </div>
    </div>
  );
};
export default PriceInfoCard;
