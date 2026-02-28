import { Check, Zap, Sparkles, Diamond, ArrowRight } from "lucide-react";

export default function MembershipPage() {
    const plans = [
        {
            name: "Vasa Rise",
            price: "Free",
            period: "",
            icon: Zap,
            features: [
                "Basic Identity Verification",
                "Apply to up to 10 jobs/month",
                "Standard Wallet functions",
                "Access to free Learning Hub content"
            ],
            current: false,
            buttonText: "Join for Free"
        },
        {
            name: "Vasa Bloom",
            price: "₹99",
            period: "/month",
            icon: Sparkles,
            features: [
                "Priority Identity Verification",
                "Unlimited job applications",
                "Reduced transaction fees (2%)",
                "Access to intermediate courses",
                "Featured profile positioning"
            ],
            current: true,
            buttonText: "Current Plan"
        },
        {
            name: "Vasa Empower",
            price: "₹199",
            period: "/month",
            icon: Diamond,
            features: [
                "Instant Identity Verification",
                "Premium support within 1 hour",
                "Zero transaction fees",
                "Full access to ALL Learning Hub content",
                "Top-tier profile visibility",
                "Team creation & management"
            ],
            current: false,
            buttonText: "Upgrade to Empower"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 py-6">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">Choose Your Membership</h1>
                <p className="text-gray-500 text-lg">Unlock premium features, faster verification, and zero fees to accelerate your career growth on VaSa.</p>
            </div>

            {/* Plans Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => {
                    const Icon = plan.icon;
                    return (
                        <div
                            key={idx}
                            className={`card relative flex flex-col items-center p-8 transition-transform hover:-translate-y-1 duration-300 ${plan.current
                                    ? 'border-brand-500 shadow-xl border-2 scale-105 z-10 bg-white'
                                    : 'border-brand-100 shadow-md bg-white opacity-95 hover:opacity-100'
                                }`}
                        >

                            {plan.current && (
                                <div className="absolute -top-4 w-full flex justify-center">
                                    <span className="bg-brand-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
                                        Active Membership
                                    </span>
                                </div>
                            )}

                            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-6 shadow-inner ${plan.current ? 'bg-gradient-brand text-white' : 'bg-brand-50 text-brand-600'}`}>
                                <Icon className="h-8 w-8" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                            </div>

                            <div className="w-full space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                        <Check className={`h-5 w-5 flex-shrink-0 ${plan.current ? 'text-brand-600' : 'text-green-500'}`} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                disabled={plan.current}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 ${plan.current
                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                                        : 'bg-gradient-brand text-white hover:opacity-90 shadow-lg focus:ring-brand-500'
                                    }`}
                            >
                                {plan.buttonText} {!plan.current && <ArrowRight className="h-4 w-4" />}
                            </button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
