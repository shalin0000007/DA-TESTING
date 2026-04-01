import React, { useState, useEffect } from 'react';
import { fetchRuntimeStats } from '../../services/api';
import { motion } from 'framer-motion';

const RuntimeAnalytics = () => {
  const [stats, setStats] = useState({
    avgTokens: 0,
    latency: 0,
    budgetBurnRate: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchRuntimeStats();
        setStats({
          avgTokens: data.avg_tokens_per_step,
          latency: data.inference_latency_5,
          budgetBurnRate: data.budget_burn_rate
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const StatCard = ({ title, value, unit = '' }) => (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}<span className="text-gray-400 text-lg"> {unit}</span></p>
    </motion.div>
  );
  
  if (loading) return <div className="text-white">Loading analytics...</div>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard title="Avg Tokens/Step" value={stats.avgTokens} />
      <StatCard title="Inference Latency" value={stats.latency} unit="ms" />
      <StatCard title="Budget Burn Rate" value={`${stats.budgetBurnRate}%`} />
    </div>
  );
};

export default RuntimeAnalytics;