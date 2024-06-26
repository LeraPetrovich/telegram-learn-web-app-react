import React, { useState, useEffect, useCallback } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },

  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },

  {
    id: "3",
    title: "Джинсы 2",
    price: 5000,
    description: "Синего цвета, прямые",
  },

  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого цвета, теплая",
  },

  {
    id: "5",
    title: "Джинсы 3",
    price: 5000,
    description: "Синего цвета, прямые",
  },

  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого цвета, теплая",
  },

  {
    id: "7",
    title: "Джинсы 4",
    price: 5500,
    description: "Синего цвета, прямые",
  },

  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
];

const ProductList = () => {
  const [adItems, setAddItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: adItems,
      totalPrice: getTotalPrice(adItems),
      queryId
    };
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [adItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  };

  const onAdd = (product) => {
    const alreadyAdded = adItems.find((item) => item.id === product.id);
    let newItems = [];
    if (alreadyAdded) {
    } else {
      newItems = adItems.filter((item) => item.id !== product.id);
      newItems = [...adItems, product];
    }
    setAddItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };
  return (
    <div className="list">
      {products.map((item) => {
        return (
          <ProductItem
            product={item}
            onAdd={onAdd}
            className={"item"}
            key={item.id}
          />
        );
      })}
    </div>
  );
};
export default ProductList;
