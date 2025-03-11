import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { ProductData } from "@/type/ProductType";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const product: ProductData = await getProductById(id);
  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  const priceCards = [
    {
      title: "Current Price",
      icon: "/assets/icons/price-tag.svg",
      value: `${product.currency} ${product.currentPrice}`,
    },
    {
      title: "Average Price",
      icon: "/assets/icons/chart.svg",
      value: `${product.currency} ${product.average}`,
    },
    {
      title: "Highest Price",
      icon: "/assets/icons/arrow-up.svg",
      value: `${product.currency} ${product.highestPrice}`,
    },
    {
      title: "Lowest Price",
      icon: "/assets/icons/arrow-down.svg",
      value: `${product.currency} ${product.lowestPrice}`,
    },
  ];

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            height={580}
            width={400}
            className="mx-auto"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-[#282828]">{product.title}</p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#d46f77]">123 </p>
              </div>
              <div className="p-2 bg-gray-200 rounded-full">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-2 bg-gray-200 rounded-full">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div>
              <div className="product-info">
                <div className="flex flex-col gap-2">
                  <p className="text-[34px] text-[#282828] font-bold">
                    {product.currency} {product.currentPrice}
                  </p>
                  <p className="text-[20px] text-[#282828] opacity-50 line-through">
                    {product.currency} {product.originalPrice}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="product-stars">
                      <Image
                        src="/assets/icons/star.svg"
                        alt="star"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm text-amber-600 font-semibold">25</p>
                    </div>

                    <div className="product-reviews">
                      <Image
                        src="/assets/icons/comment.svg"
                        alt="comment"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm text-slate-800 apacity-70 font-semibold">
                        25 Reviews
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-black opacity-50">
                    <span className="text-green-500 font-semibold">93% </span>{" "}
                    of buyers has recommended this.
                  </p>
                </div>
              </div>

              <div className="my-7 flex flex-col gap-5">
                <div className="flex gap-5 flex-wrap">
                  {priceCards?.map((card) => (
                    <PriceInfoCard key={card.title} {...card} />
                  ))}
                </div>
              </div>
            </div>
            <Modal id={id} />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl text-[#282828] font-semibold">
              Product Description
            </h3>

            <div className="flex flex-col gap-4">
              {product?.description ? "Description" : "No description found!"}
            </div>
          </div>

          <button
            className="btn w-fit mx-auto flex items-center
          justify-center gap-3 min-w-[200px]"
          >
            <Image
              src="/assets/icons/bag.svg"
              alt="check"
              width={22}
              height={22}
            />
            <Link href="/" className="text-base text-white">
              Buy Now
            </Link>
          </button>
        </div>

        {similarProducts && similarProducts?.length > 0 && (
          <div className="py-14 flex flex-col gap-2 w-full">
            <p className="section-text">Similar Products</p>

            <div className="flex flex-wrap gap-10 mt-7 w-full">
              {similarProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        <div />
      </div>
    </div>
  );
};

export default ProductDetails;
