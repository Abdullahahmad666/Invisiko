import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { Limitations } from "@/components/Limitations";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitFeature } from "@/components/SplitFeature";
import { everythingElse, featureBlocks } from "@/content/features";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/features");

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        path="/features"
        eyebrow="Features"
        title="Four jobs, one app, records that hold up."
        lead="Everything Invisiko does today, with the detail you need to judge whether it fits your kitchen — and what it doesn't do, at the bottom."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} block>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/how-it-works" variant="secondary" block>
            See how it works
          </ButtonLink>
        </div>
      </PageHero>

      {featureBlocks.map((block, index) => (
        <Section
          key={block.id}
          tone="light"
          labelledBy={`${block.id}-title`}
          className={index > 0 ? "border-t border-[#DCDCE0]" : ""}
        >
          <SplitFeature
            id={block.id}
            eyebrow={block.eyebrow}
            title={block.title}
            intro={block.intro}
            bullets={block.bullets}
            screenshot={block.screenshot}
            link={block.link}
            reverse={index % 2 === 1}
          />
        </Section>
      ))}

      <Section tone="dark" labelledBy="everything-else-title">
        <SectionHeading
          id="everything-else-title"
          eyebrow="Also included"
          title="Everything else."
          intro="The smaller things that make the four big ones work day to day."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {everythingElse.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              label={feature.title}
              title={feature.title}
              body={feature.body}
              icon={feature.icon}
              stagger={index % 3}
              compact
            />
          ))}
        </ul>
      </Section>

      <Section tone="light" labelledBy="limitations-title">
        <Limitations variant="full" headingId="limitations-title" />
      </Section>

      <CtaBand id="features-cta" />
    </>
  );
}
