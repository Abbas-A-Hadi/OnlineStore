namespace Domain.Categories;

public enum CategoryTypes : byte
{
    None = 0,
    Keyboard = 1,
    Mouse = 2,
    Case = 3,
    GraphicsCard = 4,
    CPU = 5,
    PowerSupply = 6,
    Motherboard = 7,
    Cooler = 8,
    Monitor = 9,
    RAM = 10,
    SSD = 11,
    HDD = 12
};

public static class CategoryTypesExtensions
{
    extension(CategoryTypes)
    {
        public static int LastCategoryTypeValue
        {
            get => 12;
        }

        public static CategoryTypes GetCategoryType(byte category)
            => category switch
            {
                 1 => CategoryTypes.Keyboard,
                 2 => CategoryTypes.Mouse,
                 3 => CategoryTypes.Case,
                 4 => CategoryTypes.GraphicsCard,
                 5 => CategoryTypes.CPU,
                 6 => CategoryTypes.PowerSupply,
                 7 => CategoryTypes.Motherboard,
                 8 => CategoryTypes.Cooler,
                 9 => CategoryTypes.Monitor,
                10 => CategoryTypes.RAM,
                11 => CategoryTypes.SSD,
                12 => CategoryTypes.HDD,
                 _ => CategoryTypes.None
            };
    }

    extension(CategoryTypes categoryType)
    {
        public byte GetStoredValue()
            => categoryType switch
            {
                CategoryTypes.Keyboard     =>  1,
                CategoryTypes.Mouse        =>  2,
                CategoryTypes.Case         =>  3,
                CategoryTypes.GraphicsCard =>  4,
                CategoryTypes.CPU          =>  5,
                CategoryTypes.PowerSupply  =>  6,
                CategoryTypes.Motherboard  =>  7,
                CategoryTypes.Cooler       =>  8,
                CategoryTypes.Monitor      =>  9,
                CategoryTypes.RAM          => 10,
                CategoryTypes.SSD          => 11,
                CategoryTypes.HDD          => 12,
                _ => 0
            };
    }
}