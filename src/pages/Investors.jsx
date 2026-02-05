import InvestorHero from '../components/sections/investors/InvestorHero'
import CompetitorPositioning from '../components/sections/investors/CompetitorPositioning'
import RevenueModel from '../components/sections/investors/RevenueModel'
import MaterialConversion from '../components/sections/investors/MaterialConversion'
import UnitEconomics from '../components/sections/investors/UnitEconomics'
import IPSection from '../components/sections/investors/IPSection'
import DeploymentPlan from '../components/sections/investors/DeploymentPlan'

export default function Investors() {
  return (
    <>
      <InvestorHero />
      <CompetitorPositioning />
      <RevenueModel />
      <MaterialConversion />
      <UnitEconomics />
      <IPSection />
      <DeploymentPlan />
    </>
  )
}
