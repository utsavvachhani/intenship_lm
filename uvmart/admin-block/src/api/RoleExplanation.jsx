import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
export const RoleExplanation = {
  staff: {
    icon: <AddBusinessIcon />,
    action: [
      {
        _id: 'staffVerification',
        label: 'Staff Verification',
        navigatePath: '/staff-verification',
        icon: <VerifiedUserIcon />
      }
    ]
  },

  categories: {
    icon: <InventoryIcon />,
    action: [
      {
        _id: 'category-1',
        label: 'Categories Verification',
        navigatePath: '/categoriy-verification',
        icon: <AddBusinessIcon />
      }
    ]
  },

  supplier: {
    icon: <LocalShippingIcon />,
    action: [
      {
        _id: 'supplier-1',
        label: 'Supply Orders',
        navigatePath: '/supply-orders',
        icon: <LocalShippingIcon />
      }
    ]
  },

  delivery: {
    icon: <LocalShippingIcon />,
    action: [
      {
        _id: 'delivery-1',
        label: 'Delivery Tasks',
        navigatePath: '/deliveries',
        icon: <LocalShippingIcon />
      }
    ]
  },

  shipping: {
    icon: <StorefrontIcon />,
    action: [
      {
        _id: 'shipping-1',
        label: 'Shipping Dashboard',
        navigatePath: '/shipping',
        icon: <StorefrontIcon />
      }
    ]
  }
};
