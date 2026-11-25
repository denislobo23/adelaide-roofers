// components/pdf/EstimatePDF.jsx
//
// The actual PDF document template, built with @react-pdf/renderer.
// Requires: npm install @react-pdf/renderer
//
// This is a SERVER-SIDE component (used inside an API route, not rendered
// in the browser). It receives the calculator answers, the estimate range,
// the customer's details, and the pre-computed breakdown, and lays them
// out as a one-page PDF.

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RANGE_LABEL, ASBESTOS_RESTORE_MESSAGE } from "@/lib/pricing";
import { PHONE_DISPLAY } from "@/lib/siteConfig";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#2A2724",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    borderBottom: "2px solid #C05621",
    paddingBottom: 14,
  },
  brand: {
    fontSize: 18,
    fontWeight: 700,
  },
  brandSub: {
    fontSize: 9,
    color: "#6B6259",
    marginTop: 2,
  },
  refBlock: {
    textAlign: "right",
  },
  refText: {
    fontSize: 9,
    color: "#6B6259",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginTop: 18,
    marginBottom: 8,
    color: "#C05621",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottom: "1px solid #EDE7DE",
  },
  rowLabel: {
    color: "#6B6259",
  },
  rowValue: {
    fontWeight: 700,
  },
  headlineBox: {
    backgroundColor: "#2A2724",
    padding: 18,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 16,
  },
  headlineLabel: {
    fontSize: 9,
    color: "#B8AFA4",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headlineValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#E9945F",
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    color: "#C05621",
  },
  bulletText: {
    flex: 1,
    color: "#4A4540",
  },
  disclaimer: {
    fontSize: 8.5,
    color: "#8A8078",
    marginTop: 16,
    lineHeight: 1.5,
  },
  howToUseText: {
    fontSize: 9.5,
    color: "#4A4540",
    lineHeight: 1.55,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: "1px solid #EDE7DE",
    paddingTop: 10,
    fontSize: 8,
    color: "#8A8078",
    textAlign: "center",
  },
  ctaBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#F7F4EF",
    borderRadius: 6,
  },
  ctaText: {
    fontSize: 10,
    color: "#2A2724",
  },
  ctaPhone: {
    fontSize: 13,
    fontWeight: 700,
    color: "#C05621",
    marginTop: 4,
  },
});

function formatCurrency(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

export default function EstimatePDF({ customer, answers, estimate, breakdown, refNumber }) {
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Material-aware (metal vs tile) — see lib/estimateBreakdown.js.
  const included = breakdown.includedItems || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>Adelaide Roofers</Text>
            <Text style={styles.brandSub}>Your Roof Estimate</Text>
          </View>
          <View style={styles.refBlock}>
            <Text style={styles.refText}>Ref: {refNumber}</Text>
            <Text style={styles.refText}>{dateStr}</Text>
          </View>
        </View>

        {/* Customer & property */}
        <Text style={styles.sectionTitle}>Prepared For</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Name</Text>
          <Text style={styles.rowValue}>{customer.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Property address</Text>
          <Text style={styles.rowValue}>{answers.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Job requested</Text>
          <Text style={styles.rowValue}>{breakdown.jobTypeLabel}</Text>
        </View>

        {/* Headline estimate */}
        <View style={styles.headlineBox}>
          <Text style={styles.headlineLabel}>{RANGE_LABEL}</Text>
          <Text style={styles.headlineValue}>
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </Text>
        </View>

        {answers.asbestosRedirect && (
          <Text style={styles.howToUseText}>{ASBESTOS_RESTORE_MESSAGE}</Text>
        )}

        {/* Job details used */}
        <Text style={styles.sectionTitle}>Details Used For This Estimate</Text>
        {breakdown.detailRows.map((row) => (
          <View style={styles.row} key={row.label}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
          </View>
        ))}

        {/* Cost breakdown */}
        <Text style={styles.sectionTitle}>Estimated Cost Breakdown</Text>

        {breakdown.isSimpleJob ? (
          <>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Materials</Text>
              <Text style={styles.rowValue}>{formatCurrency(breakdown.materialsTotal)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Labour</Text>
              <Text style={styles.rowValue}>{formatCurrency(breakdown.labourTotal)}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={{ ...styles.rowLabel, marginTop: 4, marginBottom: 2, fontWeight: 700, color: "#2A2724" }}>
              Materials — {formatCurrency(breakdown.materialsTotal)}
            </Text>
            {breakdown.materialLineItems.map((item) => (
              <View style={styles.row} key={item.label}>
                <Text style={styles.rowLabel}>  {item.label}</Text>
                <Text style={styles.rowValue}>{formatCurrency(item.cost)}</Text>
              </View>
            ))}

            <Text style={{ ...styles.rowLabel, marginTop: 8, marginBottom: 2, fontWeight: 700, color: "#2A2724" }}>
              Labour — {formatCurrency(breakdown.labourTotal)}
            </Text>
            {breakdown.labourLineItems.map((item) => (
              <View style={styles.row} key={item.label}>
                <Text style={styles.rowLabel}>  {item.label}</Text>
                <Text style={styles.rowValue}>{formatCurrency(item.cost)}</Text>
              </View>
            ))}

            {breakdown.supportingLineItems.length > 0 && (
              <>
                <Text style={{ ...styles.rowLabel, marginTop: 8, marginBottom: 2, fontWeight: 700, color: "#2A2724" }}>
                  Supporting Items
                </Text>
                {breakdown.supportingLineItems.map((item) => (
                  <View style={styles.row} key={item.label}>
                    <Text style={styles.rowLabel}>  {item.label}</Text>
                    <Text style={styles.rowValue}>{formatCurrency(item.cost)}</Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}

        {/* What's included */}
        {included.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>What&apos;s Typically Included</Text>
            {included.map((item) => (
              <View style={styles.bulletRow} key={item}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </>
        )}

        {/* How To Use This Estimate */}
        <Text style={styles.sectionTitle}>How To Use This Estimate</Text>
        <Text style={styles.howToUseText}>
          This figure is based entirely on what you told us about your roof — the size, the
          material, the shape, and the job you need done. It&apos;s a genuine, calculated
          estimate, not a random guess.
        </Text>
        <Text style={styles.howToUseText}>
          That said, nothing replaces the trained eye of a professional roofer standing on your
          actual roof. They may spot things a homeowner wouldn&apos;t think to mention — hidden
          damage, access issues, or a detail that changes the scope of the job — and their final
          quote will reflect what they actually find in person.
        </Text>
        <Text style={styles.howToUseText}>
          Use this estimate as a solid starting point for your budget and your conversation with
          a roofer, not as a fixed price.
        </Text>

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>
            Ready to move forward, or want to talk it through first?
          </Text>
          <Text style={styles.ctaPhone}>{PHONE_DISPLAY}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Adelaide Roofers — adelaideroofers.com.au — Operated by NETLOCAL CONSULTING PTY LTD
          (ABN 69 607 380 638) trading as Roofing Digital
        </Text>
      </Page>
    </Document>
  );
}
