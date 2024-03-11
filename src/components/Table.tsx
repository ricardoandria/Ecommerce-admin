import { useDeleteProduct } from "@/hooks/api/Product/useDeleteProduct";
import { useGetProduct } from "@/hooks/api/Product/useGetProduct";
import { API_URL } from "@/utils/constants";
import { Delete } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const TABLE_HEAD = ["Image", "Nom", "Categorie", "Prix", "Stock", "Action"];

export const ProductTable = () => {
  const { data: Products } = useGetProduct();
  const [productId, setProductId] = useState("");
  const { mutate: deleteProduct } = useDeleteProduct(productId);

  const handleDelete = (id: string) => {
    setProductId(id);
    deleteProduct({});
  };
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead className="bg-gray-400">
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <h2 className="font-normal leading-none opacity-70">{head}</h2>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Products?.map((product) => (
          <tr className=" border-b">
            <td>
              <Image
                src={`http://localhost:5000/images/${product.image}`}
                alt="product image"
                width={40}
                height={40}
              />
            </td>
            <td className="py-4">{product.name}</td>
            <td>{product.categorie}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <Delete onClick={() => handleDelete(product._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
