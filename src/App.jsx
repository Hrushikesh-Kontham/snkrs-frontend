import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddSneaker from './pages/admin/AddSneaker';
import EditSneaker from './pages/admin/EditSneaker';
import Footer from './components/common/Footer';

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sneakers" element={<ProductListing />} />
                <Route path="/sneakers/:id" element={<ProductDetail />} />

                {/* Protected - User */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </Route>

                {/* Protected - Admin */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/sneakers/add" element={<AddSneaker />} />
                    <Route path="/admin/sneakers/edit/:id" element={<EditSneaker />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            </main>
            <Footer/>
        </div>
    );
};

export default App;