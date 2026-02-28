"use client";

import { useState } from "react";
import { ShieldAlert, PhoneCall, Plus, Trash2, Power } from "lucide-react";

export default function SafetySettingsPage() {
    const [sosActive, setSosActive] = useState(false);
    const [shareLocation, setShareLocation] = useState(true);

    const [contacts] = useState([
        { id: 1, name: "Varun Raj", phone: "+91 9876543210", relation: "Brother" },
        { id: 2, name: "Sneha", phone: "+91 9123456780", relation: "Friend" },
    ]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Safety Settings</h1>
                <p className="text-gray-500 mt-1">Configure your emergency contacts and SOS features.</p>
            </div>

            {/* SOS Activation Banner */}
            <div className={`rounded-xl p-6 border-2 transition-colors ${sosActive ? 'bg-red-50 border-red-500' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center shadow-lg transition-transform ${sosActive ? 'bg-red-600 text-white animate-pulse scale-110' : 'bg-gray-100 text-gray-400'}`}>
                            <ShieldAlert className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className={`text-xl font-bold ${sosActive ? 'text-red-700' : 'text-gray-900'}`}>SOS Emergency Service</h2>
                            <p className={`text-sm mt-1 ${sosActive ? 'text-red-600' : 'text-gray-500'}`}>
                                {sosActive ? 'SOS IS ACTIVE. Alerting contacts and authorities...' : 'Activate to instantly notify your emergency contacts.'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSosActive(!sosActive)}
                        className={`flex items-center justify-center h-16 w-16 rounded-full shadow-md border-4 focus:outline-none transition-all ${sosActive
                            ? 'bg-red-600 border-red-200 hover:bg-red-700'
                            : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <Power className={`h-6 w-6 ${sosActive ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900">Share Live Location</h3>
                        <p className="text-sm text-gray-500">Automatically share location when SOS is triggered</p>
                    </div>
                    <button
                        onClick={() => setShareLocation(!shareLocation)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${shareLocation ? 'bg-brand-500' : 'bg-gray-300'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${shareLocation ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>

            {/* Emergency Contacts List */}
            <div className="card space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b border-brand-100 pb-3">Emergency Contacts</h2>

                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 border border-brand-100 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shadow-sm">
                                    <PhoneCall className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{contact.name}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-sm font-medium text-gray-600">{contact.phone}</span>
                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">{contact.relation}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add New Contact Form */}
                <div className="pt-6 border-t border-brand-100">
                    <h3 className="font-bold text-gray-900 mb-4">Add New Contact</h3>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" placeholder="Name" className="input-field" required />
                        <input type="tel" placeholder="Phone Number" className="input-field" required />
                        <select className="input-field bg-white" required>
                            <option value="">Relation</option>
                            <option value="parent">Parent</option>
                            <option value="sibling">Sibling</option>
                            <option value="friend">Friend</option>
                            <option value="spouse">Spouse</option>
                        </select>
                        <div className="md:col-span-3 flex justify-end">
                            <button type="button" className="btn-primary flex items-center gap-2 px-6">
                                <Plus className="h-4 w-4" /> Add Contact
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}
