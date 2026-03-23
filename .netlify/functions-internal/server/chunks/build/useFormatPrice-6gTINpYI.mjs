const useFormatPrice = () => {
  const format = (amount) => {
    return new Intl.NumberFormat("fr-TG", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0
    }).format(amount);
  };
  return { format };
};

export { useFormatPrice as u };
//# sourceMappingURL=useFormatPrice-6gTINpYI.mjs.map
