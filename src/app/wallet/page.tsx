import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, CreditCard, Landmark, ScanBarcode, ArrowRight } from "lucide-react";

export default function WalletPage() {
    const tokenBalance = 850;
    const targetTokens = 1000;
    const progressPercent = (tokenBalance / targetTokens) * 100;

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">VaSa Wallet</h1>
                <p className="text-gray-500 mt-1">Manage your funds, track token earnings, and redeem rewards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Token Balance Card */}
                <div className="card bg-gradient-brand text-white border-none shadow-lg relative overflow-hidden flex flex-col justify-between p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 filter blur-2xl"></div>

                    <div className="relative z-10 flex justify-between items-start mb-10">
                        <div>
                            <p className="text-purple-100 font-medium text-sm mb-1 uppercase tracking-wider">Total Token Balance</p>
                            <h2 className="text-5xl font-bold font-mono tracking-tight">{tokenBalance} <span className="text-xl text-purple-200 font-sans tracking-normal">VST</span></h2>
                        </div>
                        <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner">
                            <WalletIcon className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="relative z-10 space-y-3">
                        <div className="flex justify-between text-sm font-medium text-purple-100">
                            <span>Goal: {targetTokens} VST (Premium Reward)</span>
                            <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden shadow-inner">
                            <div
                                className="bg-white h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Options */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Redeem Token Options</h2>

                    <button className="card hover:border-brand-500 hover:shadow-md transition-all flex items-center justify-between p-5 group bg-white border-brand-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                                <ArrowDownLeft className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900">Withdraw to Bank</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Convert VST tokens to real currency</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                    </button>

                    <button className="card hover:border-brand-500 hover:shadow-md transition-all flex items-center justify-between p-5 group bg-white border-brand-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900">Redeem for Courses</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Unlock Learning Hub premium content</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                    </button>

                    <button className="btn-primary py-4 mt-auto font-bold shadow-md hover:shadow-lg w-full flex items-center justify-center gap-2 text-lg">
                        Add Funds <ArrowUpRight className="h-5 w-5" />
                    </button>
                </div>

            </div>

            {/* Payment Options */}
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="card text-center hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer group p-6">
                        <CreditCard className="h-8 w-8 mx-auto text-gray-400 group-hover:text-brand-600 mb-4 transition-colors" />
                        <h3 className="font-bold text-gray-900">Credit/Debit Card</h3>
                        <p className="text-xs text-gray-500 mt-1">Visa, Mastercard, RuPay</p>
                    </div>
                    <div className="card text-center hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer group p-6">
                        <Landmark className="h-8 w-8 mx-auto text-gray-400 group-hover:text-brand-600 mb-4 transition-colors" />
                        <h3 className="font-bold text-gray-900">Bank Transfer</h3>
                        <p className="text-xs text-gray-500 mt-1">NEFT / RTGS / IMPS</p>
                    </div>
                    <div className="card text-center hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer group p-6 border-brand-400 bg-brand-50/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">Popular</div>
                        <ScanBarcode className="h-8 w-8 mx-auto text-brand-600 mb-4 transition-colors" />
                        <h3 className="font-bold text-gray-900">UPI / QR</h3>
                        <p className="text-xs text-brand-600/80 mt-1 font-medium">Google Pay, PhonePe, Paytm</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
