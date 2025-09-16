import React, { useState } from 'react';
import { Home, AlertTriangle, FileText, Folder, Settings, Calendar, Wifi, Bell } from 'lucide-react';

// Your district keys
const districtKeys = [
  'Bhopal',
  'Indore',
  'Gwalior',
  'Jabalpur',
  'Ujjain',
  'Sagar',
  'Dewas',
  'Ratlam'
];

// Your district data (unchanged)
const districtData = {
  Bhopal: {
    name: 'Bhopal',
    areaCode: 'Area 1',
    riskLevel: 'HIGH',
    alertCount: 3,
    varValue: '₹24L',
    lastUpdated: '10:00 AM',
    alerts: [
      { type: 'High Risk', severity: 'high', description: 'Rockfall expected! Halt all work.' },
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 3 days. Suggest checks and extra precautions.' },
      { type: 'High Risk', severity: 'high', description: 'Rockfall expected! Halt all work.' }
    ],
    metrics: { industrialExposure: '₹150Cr', agriculturalRisk: 'High', infrastructureRisk: 'Medium' }
  },
  Indore: {
    name: 'Indore',
    areaCode: 'Area 2',
    riskLevel: 'MEDIUM',
    alertCount: 1,
    varValue: '₹18L',
    lastUpdated: '9:45 AM',
    alerts: [
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 2 days. Suggest checks and extra precautions.' }
    ],
    metrics: { industrialExposure: '₹200Cr', agriculturalRisk: 'Medium', infrastructureRisk: 'Low' }
  },
  Gwalior: {
    name: 'Gwalior',
    areaCode: 'Area 3',
    riskLevel: 'LOW',
    alertCount: 0,
    varValue: '₹12L',
    lastUpdated: '10:15 AM',
    alerts: [],
    metrics: { industrialExposure: '₹80Cr', agriculturalRisk: 'Low', infrastructureRisk: 'Medium' }
  },
  Jabalpur: {
    name: 'Jabalpur',
    areaCode: 'Area 4',
    riskLevel: 'HIGH',
    alertCount: 2,
    varValue: '₹22L',
    lastUpdated: '9:30 AM',
    alerts: [
      { type: 'High Risk', severity: 'high', description: 'Rockfall expected! Halt all work.' },
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 5 days. Suggest checks and extra precautions.' }
    ],
    metrics: { industrialExposure: '₹120Cr', agriculturalRisk: 'High', infrastructureRisk: 'High' }
  },
  Ujjain: {
    name: 'Ujjain',
    areaCode: 'Area 5',
    riskLevel: 'MEDIUM',
    alertCount: 1,
    varValue: '₹15L',
    lastUpdated: '10:30 AM',
    alerts: [
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 4 days. Suggest checks and extra precautions.' }
    ],
    metrics: { industrialExposure: '₹90Cr', agriculturalRisk: 'Medium', infrastructureRisk: 'Medium' }
  },
  Sagar: {
    name: 'Sagar',
    areaCode: 'Area 6',
    riskLevel: 'LOW',
    alertCount: 1,
    varValue: '₹10L',
    lastUpdated: '9:15 AM',
    alerts: [{ type: 'No Risk', severity: 'low', description: "It's a great day to work !" }],
    metrics: { industrialExposure: '₹60Cr', agriculturalRisk: 'Low', infrastructureRisk: 'Low' }
  },
  Dewas: {
    name: 'Dewas',
    areaCode: 'Area 7',
    riskLevel: 'HIGH',
    alertCount: 4,
    varValue: '₹28L',
    lastUpdated: '8:45 AM',
    alerts: [
      { type: 'High Risk', severity: 'high', description: 'Rockfall expected! Halt all work.' },
      { type: 'High Risk', severity: 'high', description: 'Rockfall expected! Halt all work.' },
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 6 days. Suggest checks and extra precautions.' },
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 7 days. Suggest checks and extra precautions.' }
    ],
    metrics: { industrialExposure: '₹180Cr', agriculturalRisk: 'High', infrastructureRisk: 'High' }
  },
  Ratlam: {
    name: 'Ratlam',
    areaCode: 'Area 8',
    riskLevel: 'MEDIUM',
    alertCount: 2,
    varValue: '₹16L',
    lastUpdated: '10:10 AM',
    alerts: [
      { type: 'Potential Risk', severity: 'medium', description: 'Rockfall forecast in 8 days. Suggest checks and extra precautions.' },
      { type: 'No Risk', severity: 'low', description: "It's a great day to work !" }
    ],
    metrics: { industrialExposure: '₹95Cr', agriculturalRisk: 'Medium', infrastructureRisk: 'Medium' }
  }
};

// Utility functions
function getRiskColor(level) {
  switch (level) {
    case 'HIGH': return '#ff4757';
    case 'MEDIUM': return '#ffa502';
    case 'LOW': return '#2ed573';
    default: return '#57606f';
  }
}

function getSeverityColor(severity) {
  switch (severity) {
    case 'high': return '#ff4757';
    case 'medium': return '#ffa502';
    case 'low': return '#2ed573';
    default: return '#57606f';
  }
}

function isDistrictKey(key) {
  return districtKeys.includes(key);
}

// Sidebar items
const menuItems = [
  { id: 'dashboard', icon: Home, tooltip: 'Dashboard' },
  { id: 'alerts', icon: AlertTriangle, tooltip: 'Alerts' },
  { id: 'reports', icon: FileText, tooltip: 'Reports' },
  { id: 'files', icon: Folder, tooltip: 'Files' },
  { id: 'settings', icon: Settings, tooltip: 'Settings' }
];

// Map positions
const positions = {
  Bhopal: { x: 120, y: 120, w: 90, h: 60 },
  Indore: { x: 250, y: 200, w: 90, h: 60 },
  Gwalior: { x: 400, y: 80, w: 90, h: 60 },
  Jabalpur: { x: 550, y: 180, w: 90, h: 60 },
  Ujjain: { x: 200, y: 320, w: 90, h: 60 },
  Sagar: { x: 350, y: 300, w: 90, h: 60 },
  Dewas: { x: 500, y: 320, w: 90, h: 60 },
  Ratlam: { x: 650, y: 250, w: 90, h: 60 }
};

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState('Bhopal');
  const [currentDate] = useState('Sep 16, 2024');

  const currentData = districtData[selectedDistrict];

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {menuItems.map(item => (
          <div key={item.id} style={styles.menuItemContainer}>
            <button
              onClick={() => setActiveMenuItem(item.id)}
              style={{
                ...styles.menuButton,
                ...(activeMenuItem === item.id ? styles.activeMenuButton : {})
              }}
              title={item.tooltip}
            >
              <item.icon size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Navigation */}
        <div style={styles.topNav}>
          <div style={styles.logo}>Rock Sentinel</div>
          
          <div style={styles.navInfo}>
            <span style={styles.navLabel}>Site:</span>
            <span style={styles.navValue}>{currentData.areaCode}</span>
          </div>

          <div style={{
            ...styles.riskBadge,
            backgroundColor: getRiskColor(currentData.riskLevel) + '20',
            borderLeft: `4px solid ${getRiskColor(currentData.riskLevel)}`
          }}>
            <span style={styles.navLabel}>Risk:</span>
            <span style={{
              ...styles.riskLabel,
              backgroundColor: getRiskColor(currentData.riskLevel)
            }}>
              {currentData.riskLevel}
            </span>
          </div>

          <div style={styles.alertBadge}>
            <Bell size={16} style={styles.icon} />
            <span style={styles.navLabel}>Alerts:</span>
            <span style={styles.navValue}>({currentData.alertCount})</span>
            {currentData.alertCount > 0 && (
              <div style={styles.notificationDot}>
                {currentData.alertCount}
              </div>
            )}
          </div>

          <div style={styles.dateBadge}>
            <Calendar size={16} style={styles.icon} />
            <span style={styles.navValue}>{currentDate}</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={styles.dashboardContent}>
          {/* Map Area */}
          <div style={styles.mapContainer}>
            <div style={styles.mapCard}>
              <h2 style={styles.mapTitle}>District Risk Assessment Map</h2>
              
              {/* SVG Map */}
              <div style={styles.mapWrapper}>
                {/* Background overlay to ensure boxes are visible */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.3)',
                  borderRadius: '12px',
                  zIndex: 1
                }} />
                
                <svg viewBox="0 0 800 600" style={styles.svg}>
                  {Object.entries(districtData).map(([districtName, data]) => {
                    if (!isDistrictKey(districtName)) return null;
                    const district = districtName;
                    const pos = positions[district];
                    const isSelected = selectedDistrict === district;
                    const riskColor = getRiskColor(data.riskLevel);

                    return (
                      <g key={district}>
                        <rect
                          x={pos.x}
                          y={pos.y}
                          width={pos.w}
                          height={pos.h}
                          fill={isSelected ? riskColor : riskColor}
                          fillOpacity={isSelected ? '1' : '0.9'}
                          stroke={isSelected ? '#6366f1' : '#ffffff'}
                          strokeWidth={isSelected ? 3 : 1.5}
                          rx="8"
                          style={{
                            cursor: 'pointer',
                            filter: isSelected ? 'drop-shadow(0px 4px 12px rgba(99, 102, 241, 0.4))' : 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3))'
                          }}
                          onClick={() => handleDistrictClick(district)}
                        />
                        <text
                          x={pos.x + pos.w / 2}
                          y={pos.y + pos.h / 2 - 8}
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="600"
                          pointerEvents="none"
                          style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                          }}
                        >
                          {district}
                        </text>
                        <text
                          x={pos.x + pos.w / 2}
                          y={pos.y + pos.h / 2 + 8}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.9)"
                          fontSize="10"
                          pointerEvents="none"
                          style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                          }}
                        >
                          {data.areaCode}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Legend */}
                <div style={styles.legend}>
                  <div style={styles.legendItem}>
                    <div style={{...styles.legendColor, backgroundColor: '#ff4757'}} />
                    <span>High Risk</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{...styles.legendColor, backgroundColor: '#ffa502'}} />
                    <span>Medium Risk</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{...styles.legendColor, backgroundColor: '#2ed573'}} />
                    <span>Low Risk</span>
                  </div>
                </div>
              </div>

              {/* Last Updated Info */}
              <div style={styles.lastUpdated}>
                <div style={styles.updateTime}>{currentData.lastUpdated}</div>
                <div style={styles.updateLabel}>Last Updated</div>
              </div>
            </div>
          </div>

          {/* Alert Panel */}
          <div style={styles.alertPanel}>
            <div style={styles.alertHeader}>
              <h3 style={styles.alertTitle}>
                <AlertTriangle size={20} style={{marginRight: '8px'}} />
                ALERT PANEL
              </h3>
              <p style={styles.alertSubtitle}>
                {selectedDistrict} - {currentData.areaCode}
              </p>
            </div>

            <div style={styles.alertsList}>
              {currentData.alerts.length > 0 ? (
                currentData.alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.alertCard,
                      borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                      backgroundColor: getSeverityColor(alert.severity) + '15'
                    }}
                  >
                    <div style={styles.alertCardHeader}>
                      <span style={{
                        ...styles.alertType,
                        backgroundColor: getSeverityColor(alert.severity)
                      }}>
                        {alert.type}
                      </span>
                      <span style={styles.alertTime}>{currentData.lastUpdated}</span>
                    </div>
                    <p style={styles.alertDescription}>{alert.description}</p>
                    <p style={styles.alertLocation}>District: {selectedDistrict}</p>
                  </div>
                ))
              ) : (
                <div style={styles.noAlerts}>
                  <AlertTriangle size={48} style={styles.noAlertsIcon} />
                  <p style={styles.noAlertsText}>No active alerts</p>
                  <p style={styles.noAlertsSubtext}>It's a great day to work!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div style={styles.statusBar}>
          <div style={styles.statusItem}>Last Synced: {currentData.lastUpdated}</div>
          <div style={styles.connectionStatus}>
            <Wifi size={16} style={{marginRight: '6px'}} />
            Connection: LIVE
          </div>
          <div style={styles.statusItem}>Market: MP</div>
        </div>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    overflow: 'hidden'
  },
  sidebar: {
    width: '70px',
    backgroundColor: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    gap: '16px',
    borderRight: '1px solid #334155'
  },
  menuItemContainer: {
    position: 'relative'
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    color: '#64748b',
    padding: '12px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeMenuButton: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    transform: 'scale(1.05)'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topNav: {
    height: '70px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '24px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#6366f1',
    letterSpacing: '-0.025em'
  },
  navInfo: {
    backgroundColor: '#334155',
    borderRadius: '8px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  navLabel: {
    color: '#94a3b8',
    fontSize: '14px'
  },
  navValue: {
    color: '#ffffff',
    fontWeight: '600'
  },
  riskBadge: {
    borderRadius: '8px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  riskLabel: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  alertBadge: {
    backgroundColor: '#334155',
    borderRadius: '8px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative'
  },
  icon: {
    color: '#94a3b8'
  },
  notificationDot: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ff4757',
    color: '#ffffff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600'
  },
  dateBadge: {
    backgroundColor: '#334155',
    borderRadius: '8px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dashboardContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  mapContainer: {
    flex: 1,
    padding: '24px',
    overflow: 'auto'
  },
  mapCard: {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #334155',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  mapTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: '24px',
    letterSpacing: '-0.025em'
  },
  mapWrapper: {
    backgroundColor: '#0f172a',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #334155',
    minHeight: '400px',
    position: 'relative',
    backgroundImage: 'url(/image.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  svg: {
    width: '100%',
    height: '400px',
    position: 'relative',
    zIndex: 10
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    marginTop: '20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#94a3b8',
    fontSize: '14px'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px'
  },
  lastUpdated: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#0f172a',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #334155'
  },
  updateTime: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#6366f1'
  },
  updateLabel: {
    fontSize: '14px',
    color: '#94a3b8',
    marginTop: '4px'
  },
  alertPanel: {
    width: '350px',
    backgroundColor: '#1e293b',
    borderLeft: '1px solid #334155',
    padding: '24px',
    overflowY: 'auto'
  },
  alertHeader: {
    borderBottom: '1px solid #334155',
    paddingBottom: '16px',
    marginBottom: '24px'
  },
  alertTitle: {
    color: '#6366f1',
    fontSize: '16px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  alertSubtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  alertCard: {
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #334155'
  },
  alertCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  alertType: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '6px'
  },
  alertTime: {
    color: '#94a3b8',
    fontSize: '12px'
  },
  alertDescription: {
    color: '#ffffff',
    fontSize: '14px',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  alertLocation: {
    color: '#94a3b8',
    fontSize: '12px',
    margin: 0
  },
  noAlerts: {
    textAlign: 'center',
    padding: '48px 16px',
    color: '#94a3b8'
  },
  noAlertsIcon: {
    opacity: 0.3,
    marginBottom: '16px'
  },
  noAlertsText: {
    fontSize: '16px',
    marginBottom: '8px'
  },
  noAlertsSubtext: {
    fontSize: '14px',
    opacity: 0.7
  },
  statusBar: {
    height: '50px',
    backgroundColor: '#1e293b',
    borderTop: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px'
  },
  statusItem: {
    color: '#94a3b8',
    fontSize: '14px'
  },
  connectionStatus: {
    color: '#2ed573',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Dashboard;