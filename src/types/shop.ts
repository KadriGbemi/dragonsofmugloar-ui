export type ShopItem = {
  id: string;
  name: string;
  cost: number;
};

export type ShopListResponse = ShopItem[];

export type PurchaseShopItemResponse = {
  shoppingSuccess: string;
  gold: number;
  lives: number;
  level: number;
  turn: number;
};
