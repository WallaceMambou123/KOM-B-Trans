// Export de toutes les données mockées

// Users
export {
  mockClients,
  mockProducers,
  mockTransporters,
  currentClient,
  currentProducer,
  currentTransporter,
  getUserById,
  getProducerById,
  getTransporterById,
} from './users';

// Products
export {
  mockProducts,
  formatPrice,
  getProductsByCategory,
  getProductsByProducer,
  getDailyOffers,
  getRecommendedProducts,
  searchProducts,
  getProductById,
  productCategories,
} from './products';

// Orders
export {
  mockOrders,
  getOrdersByClient,
  getOrdersByProducer,
  getOrderById,
  getOrdersByStatus,
  generateOrderId,
  getOrderSummary,
  formatOrderStatus,
  getStatusColor,
} from './orders';

// Deliveries
export {
  mockDeliveries,
  getAvailableDeliveries,
  getDeliveriesByTransporter,
  getDeliveryById,
  getDeliveryByOrderId,
  getDeliveriesByStatus,
  generateDeliveryId,
  formatDeliveryStatus,
  getDeliveryStatusColor,
  toDeliveryCard,
  getTransporterStats,
  formatAmount,
} from './deliveries';
