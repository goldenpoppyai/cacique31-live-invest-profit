/**
 * ROIFinancingSection Component
 * 
 * Dual section showing ROI potential and financing details with PDF downloads
 */

import React from 'react';
import { Download, TrendingUp, Shield, DollarSign, FileText, Zap, Trophy, Target, Users } from 'lucide-react';

interface ROIMetrics {
  annualGrossIncome: string;
  monthlyAverage: string;
  netAnnualCashFlow: string;
  grossRentalYield: string;
  netRentalYield: string;
  fiveYearTotalReturn: string;
  annualizedReturn: string;
}

interface InvestmentBenefit {
  title: string;
  description: string;
  value: string;
  icon: string;
}

interface ROIFinancingSectionProps {
  roiMetrics: ROIMetrics;
  investmentBenefits: InvestmentBenefit[];
  onROIDownload: () => void;
  onFinancingDownload: () => void;
  onPersonalizedWorksheet: () => void;
}

const ROIFinancingSection: React.FC<ROIFinancingSectionProps> = ({
  roiMetrics,
  investmentBenefits,
  onROIDownload,
  onFinancingDownload,
  onPersonalizedWorksheet
}) => {
  return (
    <section className="section-luxury" style={{ backgroundColor: '#f6f5f4' }}>
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
            Investment Analysis & Financing
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#6b6b6b' }}>
            Comprehensive financial analysis with proven rental income and flexible financing options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ROI Panel */}
          <div className="card-luxury p-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={32} style={{ color: '#b19762' }} />
              <h3 className="text-2xl font-semibold" style={{ color: '#121212' }}>
                ROI Potential
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f6f5f4' }}>
                  <div className="text-2xl font-bold" style={{ color: '#b19762' }}>
                    {roiMetrics.annualGrossIncome}
                  </div>
                  <div className="text-sm" style={{ color: '#6b6b6b' }}>
                    Annual Gross Income
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f6f5f4' }}>
                  <div className="text-2xl font-bold" style={{ color: '#b19762' }}>
                    {roiMetrics.monthlyAverage}
                  </div>
                  <div className="text-sm" style={{ color: '#6b6b6b' }}>
                    Monthly Average
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#121212' }}>
                    {roiMetrics.netAnnualCashFlow}
                  </div>
                  <div className="text-sm" style={{ color: '#6b6b6b' }}>
                    Net Annual Cash Flow
                  </div>
                </div>
                
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#121212' }}>
                    {roiMetrics.grossRentalYield}
                  </div>
                  <div className="text-sm" style={{ color: '#6b6b6b' }}>
                    Gross Rental Yield
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(177, 151, 98, 0.1)' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#b19762' }}>
                    {roiMetrics.annualizedReturn}
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#121212' }}>
                    5-Year Annualized Return
                  </div>
                  <div className="text-sm mt-1" style={{ color: '#6b6b6b' }}>
                    Total Return: {roiMetrics.fiveYearTotalReturn}
                  </div>
                </div>
              </div>

              <button
                onClick={onROIDownload}
                className="w-full btn-luxury btn-luxury--primary focus-luxury flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(180deg, #b19762, #a08856)' }}
              >
                <Download size={18} />
                Download ROI Analysis PDF
              </button>
            </div>
          </div>

          {/* Strategic Investment Benefits Panel */}
          <div className="card-luxury p-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={32} style={{ color: '#b19762' }} />
              <h3 className="text-2xl font-semibold" style={{ color: '#121212' }}>
                Strategic Investment Benefits
              </h3>
            </div>

            <div className="space-y-6">
              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 gap-4">
                {investmentBenefits.map((benefit, index) => {
                  const getIcon = (iconName: string) => {
                    switch(iconName) {
                      case 'shield': return <Shield size={24} style={{ color: '#b19762' }} />;
                      case 'zap': return <Zap size={24} style={{ color: '#b19762' }} />;
                      case 'trophy': return <Trophy size={24} style={{ color: '#b19762' }} />;
                      case 'target': return <Target size={24} style={{ color: '#b19762' }} />;
                      case 'users': return <Users size={24} style={{ color: '#b19762' }} />;
                      default: return <DollarSign size={24} style={{ color: '#b19762' }} />;
                    }
                  };

                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f6f5f4' }}>
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(benefit.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm" style={{ color: '#121212' }}>
                            {benefit.title}
                          </h4>
                          <div className="text-sm font-bold" style={{ color: '#b19762' }}>
                            {benefit.value}
                          </div>
                        </div>
                        <p className="text-xs" style={{ color: '#6b6b6b' }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Smart Leverage Highlight */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(177, 151, 98, 0.1)' }}>
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: '#121212' }}>
                    Smart Leverage Strategy
                  </div>
                  <p className="text-sm" style={{ color: '#6b6b6b' }}>
                    <strong>60% Financing Available</strong> • <strong>USD Denominated</strong><br />
                    Preserve $2.8M liquidity for diversified investments<br />
                    <em>Tax-deductible interest + inflation hedge benefits</em>
                  </p>
                </div>
              </div>

              {/* Exclusive Investment Advantages */}
              <div className="p-4 rounded-lg border-2" style={{ borderColor: '#b19762', backgroundColor: '#ffffff' }}>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: '#121212' }}>
                  <Trophy size={16} style={{ color: '#b19762' }} />
                  Exclusive Investment Advantages
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span style={{ color: '#6b6b6b' }}>Casa de Campo Membership</span>
                    <span className="font-medium" style={{ color: '#b19762' }}>$100K+ Value</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6b6b6b' }}>Golf Course Frontage</span>
                    <span className="font-medium" style={{ color: '#b19762' }}>Limited Supply</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6b6b6b' }}>Professional Management</span>
                    <span className="font-medium" style={{ color: '#b19762' }}>Hands-Off</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6b6b6b' }}>Estate Planning Benefits</span>
                    <span className="font-medium" style={{ color: '#b19762' }}>Legacy Asset</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onFinancingDownload}
                  className="w-full btn-luxury btn-luxury--ghost focus-luxury flex items-center justify-center gap-2"
                  style={{ color: '#b19762', borderColor: '#b19762' }}
                >
                  <FileText size={18} />
                  Download Investment Strategy Guide
                </button>
                
                <button
                  onClick={onPersonalizedWorksheet}
                  className="w-full btn-luxury btn-luxury--primary focus-luxury flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(180deg, #b19762, #a08856)' }}
                >
                  <DollarSign size={18} />
                  Get Your Wealth Strategy Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIFinancingSection;