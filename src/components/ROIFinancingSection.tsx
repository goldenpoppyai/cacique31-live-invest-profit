/**
 * ROIFinancingSection Component
 * 
 * Dual section showing ROI potential and financing details with PDF downloads
 */

import React from 'react';
import { Download, TrendingUp, Calculator, DollarSign, FileText } from 'lucide-react';

interface ROIMetrics {
  annualGrossIncome: string;
  monthlyAverage: string;
  netAnnualCashFlow: string;
  grossRentalYield: string;
  netRentalYield: string;
  fiveYearTotalReturn: string;
  annualizedReturn: string;
}

interface FinancingCost {
  item: string;
  monthlyUSD: string;
}

interface ROIFinancingSectionProps {
  roiMetrics: ROIMetrics;
  financingCosts: FinancingCost[];
  onROIDownload: () => void;
  onFinancingDownload: () => void;
  onPersonalizedWorksheet: () => void;
}

const ROIFinancingSection: React.FC<ROIFinancingSectionProps> = ({
  roiMetrics,
  financingCosts,
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

          {/* Financing Panel */}
          <div className="card-luxury p-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-3 mb-6">
              <Calculator size={32} style={{ color: '#b19762' }} />
              <h3 className="text-2xl font-semibold" style={{ color: '#121212' }}>
                Financing Details
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4" style={{ color: '#121212' }}>
                  Sample Financing Scenario
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#f6f5f4' }}>
                        <th className="text-left p-3 rounded-l-lg" style={{ color: '#121212' }}>
                          Cost Item
                        </th>
                        <th className="text-right p-3 rounded-r-lg" style={{ color: '#121212' }}>
                          Monthly USD
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {financingCosts.map((cost, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-3" style={{ color: '#6b6b6b' }}>
                            {cost.item}
                          </td>
                          <td className="p-3 text-right font-medium" style={{ color: '#121212' }}>
                            {cost.monthlyUSD}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(177, 151, 98, 0.1)' }}>
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: '#121212' }}>
                    Smart Investment vs. Full Cash Purchase
                  </div>
                  <p className="text-sm" style={{ color: '#6b6b6b' }}>
                    <strong>Monthly Rental Income: $41,667</strong><br />
                    Monthly Investment: $57,418 (covers ownership costs)<br />
                    <em>Add personal financing benefits and tax advantages for complete ROI picture</em>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onFinancingDownload}
                  className="w-full btn-luxury btn-luxury--ghost focus-luxury flex items-center justify-center gap-2"
                  style={{ color: '#b19762', borderColor: '#b19762' }}
                >
                  <FileText size={18} />
                  Download Smart Investment Guide
                </button>
                
                <button
                  onClick={onPersonalizedWorksheet}
                  className="w-full btn-luxury btn-luxury--primary focus-luxury flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(180deg, #b19762, #a08856)' }}
                >
                  <DollarSign size={18} />
                  Get Your Personalized Analysis
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