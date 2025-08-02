"use client";

/**
 * Metrics chart component for the integrated headline
 * Source: https://21st.dev/reaviz/areachart-multiseries/default
 */

import React from 'react';
import { H3 } from '@leafygreen-ui/typography';
import Badge from '@leafygreen-ui/badge';
import {
  AreaChart,
  AreaSeries,
  Area,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  GridlineSeries,
  Gridline,
  Gradient,
  GradientStop
} from 'reaviz';
import { createMetricsChartData } from '@/utils/generalUtils';
import { useMobile } from '@/hooks/useMobile';
import styles from './MetricsChart.module.css';

export default function MetricsChart({ article }) {
  const chartData = createMetricsChartData(article);
  const isMobile = useMobile();

  return (
    <div className={styles.metricsCard}>   
      <div className={styles.legends}>
          <Badge variant="yellow">Visits</Badge>
          <Badge variant="green">Shares</Badge>
          <Badge variant="blue">Comments</Badge>
      </div>

      <AreaChart
        data={chartData}
        height={isMobile ? 250 : 375}
        width="100%"
        tooltip={null}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                      })
                    }
                    fill="#4a4a4a"
                  />
                }
                tickSize={10}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={null}
                tickSize={20}
              />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            interpolation="smooth"
            tooltip={null}
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.1} />,
                    ]}
                  />
                }
              />
            }
            colorScheme={['#F59E0B', '#10B981', '#3B82F6']}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="#e5e5e5" />}
          />
        }
      />
    </div>
  );
}
