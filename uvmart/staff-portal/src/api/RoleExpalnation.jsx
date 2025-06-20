import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const RoleExplanation = {
  'Vendor': {
    buttons: [
      {
        _id: 'vendor-1',
        label: 'Add Categories',
        navigatePath: '/added-categories',
        icon: <AddBusinessIcon />
      },
      {
        _id: 'vendor-2',
        label: 'My Categories',
        navigatePath: '/my-categories',
        icon: <InventoryIcon />
      }
    ]
  },
  'Supplier': {
    buttons: [
      {
        _id: 'supplier-1',
        label: 'Supply Orders',
        navigatePath: '/supply-orders',
        icon: <LocalShippingIcon />
      },
      {
        _id: 'vendor-2',
        label: 'My Categories',
        navigatePath: '/my-categories',
        icon: <InventoryIcon />
      }
    ]
  },
  'Delivery Agent': {
    buttons: [
      {
        _id: 'delivery-1',
        label: 'Delivery Tasks',
        navigatePath: '/deliveries',
        icon: <LocalShippingIcon />
      }
    ]
  },
  'Shipping Partner': {
    buttons: [
      {
        _id: 'shipping-1',
        label: 'Shipping Dashboard',
        navigatePath: '/shipping',
        icon: <StorefrontIcon />
      }
    ]
  }
};
