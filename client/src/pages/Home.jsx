import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-20 py-30  text-white overflow-hidden">
        {/* Background Image with Fade Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
          }}
        ></div>

        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 via-slate-400/50 to-indigo-900/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-100 to-blue-100 bg-clip-text text-transparent">
            Take Control of Your Financial Future
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Track expenses, manage budgets, and achieve your financial goals
            with our powerful and intuitive personal finance tracker.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started Free
            </button>
            <button className="border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-900 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-20 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            Everything You Need to Manage Your Money
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Expense Tracking
              </h3>
              <p className="text-slate-600">
                Automatically categorize and track every transaction to
                understand where your money goes.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Budget Management
              </h3>
              <p className="text-slate-600">
                Set spending limits for different categories and get alerts when
                you're close to your budget.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Financial Goals
              </h3>
              <p className="text-slate-600">
                Set savings goals and track your progress with visual indicators
                and milestone celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-20 py-16 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                50K+
              </div>
              <div className="text-slate-600">Active Users</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-slate-600">Money Tracked</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-slate-600">User Satisfaction</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                24/7
              </div>
              <div className="text-slate-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-20 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            Get Started in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Sign Up & Connect
              </h3>
              <p className="text-slate-600">
                Create your account and securely connect your bank accounts or
                add transactions manually.
              </p>
              {/* Connection line */}
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
            </div>

            <div className="text-center relative">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Set Your Budget
              </h3>
              <p className="text-slate-600">
                Define your spending categories and set monthly budgets based on
                your financial goals.
              </p>
              {/* Connection line */}
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Track & Achieve
              </h3>
              <p className="text-slate-600">
                Monitor your spending, get insights, and watch as you achieve
                your financial milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-20 py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-slate-300 text-sm">
                    Marketing Manager
                  </div>
                </div>
              </div>
              <p className="text-slate-300 italic">
                "This app completely changed how I manage my finances. I've
                saved over $3,000 in the first 6 months just by being more aware
                of my spending patterns."
              </p>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-slate-300 text-sm">
                    Software Developer
                  </div>
                </div>
              </div>
              <p className="text-slate-300 italic">
                "The budget alerts have been a game-changer. I finally have
                control over my spending and I'm on track to buy my first home
                next year!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-20 py-16 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of users who have already taken control of their
            finances.
          </p>
          <button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
            Start Your Financial Journey Today
          </button>
          <p className="text-sm text-emerald-200 mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
