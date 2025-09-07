import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Play,
  Target,
  Zap,
  Brain,
  Users,
  Check,
  ArrowRight,
  Dumbbell,
  Eye,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  const [currentSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  const sections = ["hero", "problem", "solution", "technologies", "impact"];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Review System Component
  const ReviewSystem = () => {
    const [reviews, setReviews] = useState([
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2024-03-15",
        comment:
          "This 3D visualizer completely transformed my workout routine! I finally understand which muscles I'm targeting with each exercise. The interactive model is incredibly detailed and helpful.",
        avatar: "SJ",
      },
      {
        id: 2,
        name: "Mike Chen",
        rating: 5,
        date: "2024-03-12",
        comment:
          "As a personal trainer, I recommend this tool to all my clients. The visual feedback helps them understand proper form and muscle engagement better than any explanation I could give.",
        avatar: "MC",
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        rating: 4,
        date: "2024-03-10",
        comment:
          "Love the concept and execution! The 3D models are very realistic. It's made my home workouts much more effective. Would love to see more exercise variations added.",
        avatar: "ER",
      },
      {
        id: 4,
        name: "James Wilson",
        rating: 5,
        date: "2024-03-08",
        comment:
          "Game-changer for fitness education! The interface is intuitive and the muscle highlighting feature is brilliant. My workout efficiency has improved significantly.",
        avatar: "JW",
      },
    ]);

    const [newReview, setNewReview] = useState({
      name: "",
      rating: 5,
      comment: "",
    });

    const [showForm, setShowForm] = useState(false);

    const handleSubmitReview = (e) => {
      e.preventDefault();
      if (newReview.name.trim() && newReview.comment.trim()) {
        const review = {
          id: reviews.length + 1,
          name: newReview.name,
          rating: newReview.rating,
          date: new Date().toISOString().split("T")[0],
          comment: newReview.comment,
          avatar: newReview.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
        };
        setReviews([review, ...reviews]);
        setNewReview({ name: "", rating: 5, comment: "" });
        setShowForm(false);
      }
    };

    const renderStars = (rating) => {
      return [...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
          }`}
        />
      ));
    };

    return (
      <div className='space-y-12'>
        {/* Review Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <div className='text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10'>
            <div className='text-4xl font-bold text-yellow-400 mb-2'>4.8</div>
            <div className='flex justify-center space-x-1 mb-2'>
              {renderStars(5)}
            </div>
            <div className='text-gray-300'>Average Rating</div>
          </div>

          <div className='text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10'>
            <div className='text-4xl font-bold text-blue-400 mb-2'>
              {reviews.length}
            </div>
            <div className='text-gray-300'>Total Reviews</div>
          </div>

          <div className='text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10'>
            <div className='text-4xl font-bold text-green-400 mb-2'>95%</div>
            <div className='text-gray-300'>Recommend Rate</div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className='text-center'>
          <button
            onClick={() => setShowForm(!showForm)}
            className='group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25'
          >
            <span className='flex items-center space-x-2'>
              <MessageSquare className='w-5 h-5' />
              <span>{showForm ? "Cancel" : "Write a Review"}</span>
            </span>
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className='bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8'>
            <h3 className='text-2xl font-bold mb-6'>Share Your Experience</h3>
            <form onSubmit={handleSubmitReview} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Your Name
                </label>
                <input
                  type='text'
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all'
                  placeholder='Enter your name'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Rating
                </label>
                <div className='flex space-x-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className='focus:outline-none'
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= newReview.rating
                            ? "text-yellow-400 fill-current hover:text-yellow-300"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none'
                  placeholder='Tell us about your experience with the 3D Body Fitness Visualizer...'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105'
              >
                <span className='flex items-center justify-center space-x-2'>
                  <Send className='w-5 h-5' />
                  <span>Submit Review</span>
                </span>
              </button>
            </form>
          </div>
        )}

        {/* Reviews Display */}
        <div className='space-y-6'>
          <h3 className='text-2xl font-bold text-center'>
            What Users Are Saying
          </h3>

          <div className='grid gap-6'>
            {reviews.map((review) => (
              <div
                key={review.id}
                className='p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300'
              >
                <div className='flex items-start space-x-4'>
                  {/* Avatar */}
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center font-bold text-white'>
                    {review.avatar}
                  </div>

                  <div className='flex-1'>
                    {/* Header */}
                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <h4 className='font-semibold text-white'>
                          {review.name}
                        </h4>
                        <p className='text-sm text-gray-400'>{review.date}</p>
                      </div>
                      <div className='flex space-x-1'>
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className='text-gray-300 leading-relaxed'>
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const BodyAnimation = () => {
    const [activeBodyPart, setActiveBodyPart] = useState("chest");
    const bodyParts = ["chest", "abs", "quads", "shoulders", "back"];

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveBodyPart((prev) => {
          const currentIndex = bodyParts.indexOf(prev);
          return bodyParts[(currentIndex + 1) % bodyParts.length];
        });
      }, 2000);
      return () => clearInterval(interval);
    });

    return (
      <div className='relative w-80 h-96 mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/20'></div>

        {/* Simplified 3D Body Representation */}
        <div className='relative w-full h-full flex items-center justify-center'>
          <div className='relative'>
            {/* Body outline */}
            <div className='w-32 h-64 relative'>
              {/* Head */}
              <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-80'></div>

              {/* Torso */}
              <div className='absolute top-14 left-1/2 transform -translate-x-1/2 w-24 h-32 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 opacity-60'>
                {/* Chest highlight */}
                <div
                  className={`absolute top-2 inset-x-2 h-8 rounded-md transition-all duration-500 ${
                    activeBodyPart === "chest"
                      ? "bg-red-400 shadow-lg shadow-red-400/50"
                      : "bg-transparent"
                  }`}
                ></div>

                {/* Abs highlight */}
                <div
                  className={`absolute top-12 inset-x-4 h-12 rounded-md transition-all duration-500 ${
                    activeBodyPart === "abs"
                      ? "bg-red-400 shadow-lg shadow-red-400/50"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>

              {/* Arms */}
              <div
                className={`absolute top-16 -left-4 w-6 h-20 rounded-full transition-all duration-500 ${
                  activeBodyPart === "shoulders"
                    ? "bg-red-400 shadow-lg shadow-red-400/50"
                    : "bg-gradient-to-b from-blue-400 to-purple-400 opacity-60"
                }`}
              ></div>
              <div
                className={`absolute top-16 -right-4 w-6 h-20 rounded-full transition-all duration-500 ${
                  activeBodyPart === "shoulders"
                    ? "bg-red-400 shadow-lg shadow-red-400/50"
                    : "bg-gradient-to-b from-blue-400 to-purple-400 opacity-60"
                }`}
              ></div>

              {/* Legs */}
              <div
                className={`absolute top-44 left-2 w-8 h-16 rounded-lg transition-all duration-500 ${
                  activeBodyPart === "quads"
                    ? "bg-red-400 shadow-lg shadow-red-400/50"
                    : "bg-gradient-to-b from-blue-400 to-purple-400 opacity-60"
                }`}
              ></div>
              <div
                className={`absolute top-44 right-2 w-8 h-16 rounded-lg transition-all duration-500 ${
                  activeBodyPart === "quads"
                    ? "bg-red-400 shadow-lg shadow-red-400/50"
                    : "bg-gradient-to-b from-blue-400 to-purple-400 opacity-60"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Active muscle label */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
          <div className='px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20'>
            <span className='text-white font-medium capitalize'>
              {activeBodyPart}
            </span>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden'>
      {/* Hero Section */}
      <section
        id='hero'
        ref={(el) => (sectionRefs.current[0] = el)}
        className='min-h-screen flex items-center justify-center relative px-6'
      >
        {/* Background Effects */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-4 -right-4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-4 -left-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl'></div>
        </div>

        <div
          className={`relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Content */}
          <div className='space-y-8'>
            <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20'>
              <Dumbbell className='w-5 h-5 text-blue-400' />
              <span className='text-sm font-medium'>
                Revolutionary Fitness Tech
              </span>
            </div>

            <h1 className='text-6xl lg:text-7xl font-bold leading-tight'>
              <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                3D Body
              </span>
              <br />
              <span className='text-white'>Fitness Visualizer</span>
            </h1>

            <p className='text-xl lg:text-2xl text-gray-300 leading-relaxed'>
              Transform your workout understanding with interactive 3D muscle
              visualization. See exactly which muscles you're targeting with
              every exercise.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25'>
                <span className='flex items-center space-x-2'>
                  <Play className='w-5 h-5' />
                  <span>Start Exploring</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </span>
              </button>

              <button className='px-8 py-4 rounded-xl font-semibold border-2 border-white/20 hover:border-white/40 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300'>
                Watch Demo
              </button>
            </div>

            <div className='flex items-center space-x-8 text-sm text-gray-400'>
              <div className='flex items-center space-x-2'>
                <Eye className='w-4 h-4 text-blue-400' />
                <span>Interactive 3D Models</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Target className='w-4 h-4 text-purple-400' />
                <span>Precise Targeting</span>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Body Animation */}
          <div className='flex justify-center lg:justify-end'>
            <BodyAnimation />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <button
            onClick={() => scrollToSection(1)}
            className='p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all'
          >
            <ChevronDown className='w-6 h-6' />
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section
        id='problem'
        ref={(el) => (sectionRefs.current[1] = el)}
        className='min-h-screen flex items-center px-6 py-20'
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible.problem
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold mb-6'>
              <span className='text-red-400'>The Problem</span> We Solve
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Fitness enthusiasts face significant challenges in understanding
              proper exercise targeting
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {[
              {
                icon: <Brain className='w-12 h-12 text-red-400' />,
                title: "Confusion & Uncertainty",
                description:
                  "Many struggle to understand which exercises target specific muscles effectively, leading to workout confusion.",
              },
              {
                icon: <Target className='w-12 h-12 text-orange-400' />,
                title: "Static Solutions",
                description:
                  "Existing solutions are often text-based or lack interactivity, making muscle targeting hard to visualize.",
              },
              {
                icon: <TrendingUp className='w-12 h-12 text-yellow-400' />,
                title: "Inefficient Workouts",
                description:
                  "Poor understanding leads to improper form and inefficient workouts that don't deliver desired results.",
              },
            ].map((problem, index) => (
              <div
                key={index}
                className='p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105'
              >
                <div className='mb-6'>{problem.icon}</div>
                <h3 className='text-2xl font-bold mb-4'>{problem.title}</h3>
                <p className='text-gray-300 leading-relaxed'>
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id='solution'
        ref={(el) => (sectionRefs.current[2] = el)}
        className='min-h-screen flex items-center px-6 py-20 relative'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10'></div>

        <div
          className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${
            isVisible.solution
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='space-y-8'>
              <h2 className='text-5xl font-bold'>
                Our{" "}
                <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Solution
                </span>
              </h2>

              <p className='text-xl text-gray-300 leading-relaxed'>
                Our interactive 3D Body Fitness Visualizer provides a dynamic,
                engaging experience where users can explore targeted exercises
                by visualizing muscles in real-time 3D.
              </p>

              <div className='space-y-6'>
                {[
                  "Select specific body parts like Chest, Abs, or Quads",
                  "See real-time 3D visualization of targeted muscles",
                  "Understand proper form and muscle activation",
                  "Improve workout efficiency and motivation",
                ].map((feature, index) => (
                  <div key={index} className='flex items-start space-x-4'>
                    <div className='p-1 bg-green-500 rounded-full'>
                      <Check className='w-4 h-4 text-white' />
                    </div>
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
              </div>

              <button className='group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25'>
                <span className='flex items-center space-x-2'>
                  <Play className='w-5 h-5' />
                  <span>Try It Now</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </span>
              </button>
            </div>

            <div className='flex justify-center'>
              <div className='relative'>
                <BodyAnimation />
                <div className='absolute -top-8 -right-8 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl'></div>
                <div className='absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl'></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        id='technologies'
        ref={(el) => (sectionRefs.current[3] = el)}
        className='min-h-screen flex items-center px-6 py-20'
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible.technologies
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold mb-6'>
              Powered by{" "}
              <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Modern Tech
              </span>
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Built with cutting-edge technologies for optimal performance and
              user experience
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: "⚛️",
                title: "React",
                description:
                  "Building responsive and interactive web interfaces with component-based architecture",
              },
              {
                icon: "⚡",
                title: "Vite",
                description:
                  "Lightning-fast development and optimized performance for seamless user experience",
              },
              {
                icon: "🎯",
                title: "3D Integration",
                description:
                  "Advanced 3D models for realistic human body and muscle group visualization",
              },
              {
                icon: "🚀",
                title: "Modern UX",
                description:
                  "Intuitive design patterns that make fitness education accessible and enjoyable",
              },
              {
                icon: "📱",
                title: "Responsive Design",
                description:
                  "Works perfectly across all devices from desktop to mobile",
              },
              {
                icon: "🔄",
                title: "Real-time Updates",
                description:
                  "Instant visual feedback as users interact with different body parts",
              },
            ].map((tech, index) => (
              <div
                key={index}
                className='p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 text-center'
              >
                <div className='text-4xl mb-4'>{tech.icon}</div>
                <h3 className='text-xl font-bold mb-3'>{tech.title}</h3>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id='impact'
        ref={(el) => (sectionRefs.current[4] = el)}
        className='min-h-screen flex items-center px-6 py-20 relative'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10'></div>

        <div
          className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${
            isVisible.impact
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'>
                Impact
              </span>{" "}
              & Benefits
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Transforming how people understand and approach their fitness
              journey
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8 mb-16'>
            {[
              {
                icon: <Brain className='w-12 h-12 text-green-400' />,
                title: "Enhanced Learning",
                description:
                  "Users learn proper exercises and muscle targeting through immersive visual education",
                metric: "85% better retention",
              },
              {
                icon: <Zap className='w-12 h-12 text-blue-400' />,
                title: "Improved Efficiency",
                description:
                  "Better workout efficiency and proper form reduce injury risk and maximize results",
                metric: "40% faster progress",
              },
              {
                icon: <Users className='w-12 h-12 text-purple-400' />,
                title: "Accessible Fitness",
                description:
                  "Makes fitness education accessible, visual, and enjoyable for users of all levels",
                metric: "90% user satisfaction",
              },
            ].map((impact, index) => (
              <div
                key={index}
                className='p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 text-center'
              >
                <div className='mb-6 flex justify-center'>{impact.icon}</div>
                <h3 className='text-2xl font-bold mb-4'>{impact.title}</h3>
                <p className='text-gray-300 leading-relaxed mb-4'>
                  {impact.description}
                </p>
                <div className='text-lg font-semibold text-green-400'>
                  {impact.metric}
                </div>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <button className='group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-5 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25'>
              <span className='flex items-center space-x-3'>
                <Play className='w-6 h-6' />
                <span>Experience the Future of Fitness</span>
                <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Dots */}
      <div className='fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-50'>
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-blue-400 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
