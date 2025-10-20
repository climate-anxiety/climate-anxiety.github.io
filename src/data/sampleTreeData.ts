import type { TreeData } from '../types/treeFlow.ts';

export const sampleTreeData: TreeData = {
  startQuestionId: "q1",
  questions: {
    "q1": {
      id: "q1",
      label: "How concerned are you about climate change?",
      choices: [
        { id: "low", label: "Not concerned", targetQuestionId: "q2" },
        { id: "med", label: "Somewhat concerned", targetQuestionId: "q3" },
        { id: "high", label: "Very concerned", targetQuestionId: "q3" }
      ]
    },
    "q2": {
      id: "q2", 
      label: "What influences your low concern?",
      choices: [
        { id: "media", label: "Media skepticism", targetQuestionId: "q4" },
        { id: "science", label: "Scientific doubt", targetQuestionId: "q4" },
        { id: "other", label: "Other reasons", targetQuestionId: "q4" }
      ]
    },
    "q3": {
      id: "q3",
      label: "Which aspects worry you most?",
      choices: [
        { id: "env", label: "Environment", targetQuestionId: "q5" },
        { id: "econ", label: "Economy", targetQuestionId: "q6" },
        { id: "health", label: "Health", targetQuestionId: "q5" },
        { id: "future", label: "Future generations", targetQuestionId: "q7" }
      ]
    },
    "q4": {
      id: "q4",
      label: "What would help you feel more confident?",
      choices: [
        { id: "education", label: "More education", targetQuestionId: "q8" },
        { id: "evidence", label: "Clear evidence", targetQuestionId: "q8" },
        { id: "solutions", label: "Practical solutions", targetQuestionId: "q9" }
      ]
    },
    "q5": {
      id: "q5",
      label: "What environmental impacts concern you?",
      choices: [
        { id: "weather", label: "Extreme weather", targetQuestionId: "q10" },
        { id: "ecosystems", label: "Ecosystem damage", targetQuestionId: "q10" },
        { id: "biodiversity", label: "Biodiversity loss", targetQuestionId: "q11" }
      ]
    },
    "q6": {
      id: "q6",
      label: "What economic concerns do you have?",
      choices: [
        { id: "jobs", label: "Job losses", targetQuestionId: "q12" },
        { id: "costs", label: "Transition costs", targetQuestionId: "q12" },
        { id: "inequality", label: "Economic inequality", targetQuestionId: "q13" }
      ]
    },
    "q7": {
      id: "q7",
      label: "What worries you about future generations?",
      choices: [
        { id: "inheritance", label: "What we're leaving them", targetQuestionId: "q14" },
        { id: "preparation", label: "Are they prepared?", targetQuestionId: "q14" },
        { id: "responsibility", label: "Our responsibility", targetQuestionId: "q15" }
      ]
    },
    "q8": {
      id: "q8",
      label: "What type of education would be most helpful?",
      choices: [
        { id: "scientific", label: "Scientific literacy", targetQuestionId: "q16" },
        { id: "practical", label: "Practical knowledge", targetQuestionId: "q16" },
        { id: "critical", label: "Critical thinking", targetQuestionId: "q17" }
      ]
    },
    "q9": {
      id: "q9",
      label: "What solutions interest you most?",
      choices: [
        { id: "renewable", label: "Renewable energy", targetQuestionId: "q18" },
        { id: "conservation", label: "Conservation", targetQuestionId: "q18" },
        { id: "technology", label: "New technology", targetQuestionId: "q19" }
      ]
    },
    "q10": {
      id: "q10",
      label: "How do you cope with these concerns?",
      choices: [
        { id: "action", label: "Take action", targetQuestionId: "q20" },
        { id: "community", label: "Join community", targetQuestionId: "q20" },
        { id: "education", label: "Learn more", targetQuestionId: "q21" }
      ]
    },
    "q11": {
      id: "q11",
      label: "What biodiversity issues concern you?",
      choices: [
        { id: "extinction", label: "Species extinction", targetQuestionId: "q22" },
        { id: "habitat", label: "Habitat loss", targetQuestionId: "q22" },
        { id: "ecosystem", label: "Ecosystem collapse", targetQuestionId: "q23" }
      ]
    },
    "q12": {
      id: "q12",
      label: "How do you see the economic transition?",
      choices: [
        { id: "opportunity", label: "Economic opportunity", targetQuestionId: "q24" },
        { id: "challenge", label: "Major challenge", targetQuestionId: "q24" },
        { id: "necessary", label: "Necessary change", targetQuestionId: "q25" }
      ]
    },
    "q13": {
      id: "q13",
      label: "What inequality concerns you most?",
      choices: [
        { id: "global", label: "Global inequality", targetQuestionId: "q26" },
        { id: "generational", label: "Generational inequality", targetQuestionId: "q26" },
        { id: "access", label: "Access to solutions", targetQuestionId: "q27" }
      ]
    },
    "q14": {
      id: "q14",
      label: "What do you want to leave for future generations?",
      choices: [
        { id: "hope", label: "Hope and solutions", targetQuestionId: "q28" },
        { id: "knowledge", label: "Knowledge and skills", targetQuestionId: "q28" },
        { id: "action", label: "Action and change", targetQuestionId: "q29" }
      ]
    },
    "q15": {
      id: "q15",
      label: "How do you see your responsibility?",
      choices: [
        { id: "personal", label: "Personal responsibility", targetQuestionId: "q30" },
        { id: "collective", label: "Collective responsibility", targetQuestionId: "q30" },
        { id: "leadership", label: "Leadership role", targetQuestionId: "q31" }
      ]
    },
    "q16": {
      id: "q16",
      label: "What scientific topics interest you?",
      choices: [
        { id: "climate", label: "Climate science", targetQuestionId: "q32" },
        { id: "solutions", label: "Solution science", targetQuestionId: "q32" },
        { id: "policy", label: "Science-policy interface", targetQuestionId: "q33" }
      ]
    },
    "q17": {
      id: "q17",
      label: "What critical thinking skills do you want?",
      choices: [
        { id: "evaluation", label: "Information evaluation", targetQuestionId: "q34" },
        { id: "analysis", label: "Data analysis", targetQuestionId: "q34" },
        { id: "synthesis", label: "Problem synthesis", targetQuestionId: "q35" }
      ]
    },
    "q18": {
      id: "q18",
      label: "What renewable energy interests you?",
      choices: [
        { id: "solar", label: "Solar power", targetQuestionId: "q36" },
        { id: "wind", label: "Wind energy", targetQuestionId: "q36" },
        { id: "storage", label: "Energy storage", targetQuestionId: "q37" }
      ]
    },
    "q19": {
      id: "q19",
      label: "What new technologies excite you?",
      choices: [
        { id: "carbon", label: "Carbon capture", targetQuestionId: "q38" },
        { id: "fusion", label: "Nuclear fusion", targetQuestionId: "q38" },
        { id: "geo", label: "Geoengineering", targetQuestionId: "q39" }
      ]
    },
    "q20": {
      id: "q20",
      label: "What actions are you taking?",
      choices: [
        { id: "lifestyle", label: "Lifestyle changes", targetQuestionId: "q40" },
        { id: "advocacy", label: "Advocacy work", targetQuestionId: "q40" },
        { id: "career", label: "Career changes", targetQuestionId: "q41" }
      ]
    },
    "q21": {
      id: "q21",
      label: "What do you want to learn about?",
      choices: [
        { id: "science", label: "Climate science", targetQuestionId: "q42" },
        { id: "solutions", label: "Climate solutions", targetQuestionId: "q42" },
        { id: "policy", label: "Climate policy", targetQuestionId: "q43" }
      ]
    },
    "q22": {
      id: "q22",
      label: "How do you want to protect biodiversity?",
      choices: [
        { id: "conservation", label: "Conservation efforts", targetQuestionId: "q44" },
        { id: "restoration", label: "Ecosystem restoration", targetQuestionId: "q44" },
        { id: "protection", label: "Protected areas", targetQuestionId: "q45" }
      ]
    },
    "q23": {
      id: "q23",
      label: "What ecosystem services concern you?",
      choices: [
        { id: "water", label: "Water systems", targetQuestionId: "q46" },
        { id: "soil", label: "Soil health", targetQuestionId: "q46" },
        { id: "air", label: "Air quality", targetQuestionId: "q47" }
      ]
    },
    "q24": {
      id: "q24",
      label: "What economic opportunities do you see?",
      choices: [
        { id: "green", label: "Green jobs", targetQuestionId: "q48" },
        { id: "innovation", label: "Innovation", targetQuestionId: "q48" },
        { id: "investment", label: "Sustainable investment", targetQuestionId: "q49" }
      ]
    },
    "q25": {
      id: "q25",
      label: "What changes do you support?",
      choices: [
        { id: "policy", label: "Policy changes", targetQuestionId: "q50" },
        { id: "business", label: "Business practices", targetQuestionId: "q50" },
        { id: "individual", label: "Individual action", targetQuestionId: "q51" }
      ]
    },
    "q26": {
      id: "q26",
      label: "How can we address inequality?",
      choices: [
        { id: "justice", label: "Climate justice", targetQuestionId: "q52" },
        { id: "equity", label: "Equitable solutions", targetQuestionId: "q52" },
        { id: "support", label: "Support systems", targetQuestionId: "q53" }
      ]
    },
    "q27": {
      id: "q27",
      label: "What access barriers concern you?",
      choices: [
        { id: "financial", label: "Financial barriers", targetQuestionId: "q54" },
        { id: "information", label: "Information access", targetQuestionId: "q54" },
        { id: "technology", label: "Technology access", targetQuestionId: "q55" }
      ]
    },
    "q28": {
      id: "q28",
      label: "What gives you hope?",
      choices: [
        { id: "youth", label: "Youth activism", targetQuestionId: "q56" },
        { id: "innovation", label: "Technological innovation", targetQuestionId: "q56" },
        { id: "community", label: "Community action", targetQuestionId: "q57" }
      ]
    },
    "q29": {
      id: "q29",
      label: "What actions inspire you?",
      choices: [
        { id: "movements", label: "Climate movements", targetQuestionId: "q58" },
        { id: "leaders", label: "Climate leaders", targetQuestionId: "q58" },
        { id: "solutions", label: "Practical solutions", targetQuestionId: "q59" }
      ]
    },
    "q30": {
      id: "q30",
      label: "How do you want to contribute?",
      choices: [
        { id: "local", label: "Local action", targetQuestionId: "q60" },
        { id: "global", label: "Global perspective", targetQuestionId: "q60" },
        { id: "education", label: "Education and awareness", targetQuestionId: "q61" }
      ]
    },
    "q31": {
      id: "q31",
      label: "What leadership role appeals to you?",
      choices: [
        { id: "community", label: "Community leader", targetQuestionId: "q62" },
        { id: "professional", label: "Professional leader", targetQuestionId: "q62" },
        { id: "advocate", label: "Climate advocate", targetQuestionId: "q63" }
      ]
    },
    "q32": {
      id: "q32",
      label: "What climate science topics interest you?",
      choices: [
        { id: "atmosphere", label: "Atmospheric science", targetQuestionId: "q64" },
        { id: "ocean", label: "Ocean science", targetQuestionId: "q64" },
        { id: "cryosphere", label: "Cryosphere science", targetQuestionId: "q65" }
      ]
    },
    "q33": {
      id: "q33",
      label: "How do you see science-policy interaction?",
      choices: [
        { id: "communication", label: "Science communication", targetQuestionId: "q66" },
        { id: "translation", label: "Science translation", targetQuestionId: "q66" },
        { id: "integration", label: "Science integration", targetQuestionId: "q67" }
      ]
    },
    "q34": {
      id: "q34",
      label: "What information sources do you trust?",
      choices: [
        { id: "scientific", label: "Scientific journals", targetQuestionId: "q68" },
        { id: "institutions", label: "Research institutions", targetQuestionId: "q68" },
        { id: "experts", label: "Climate experts", targetQuestionId: "q69" }
      ]
    },
    "q35": {
      id: "q35",
      label: "What problem-solving approaches interest you?",
      choices: [
        { id: "systems", label: "Systems thinking", targetQuestionId: "q70" },
        { id: "collaborative", label: "Collaborative approaches", targetQuestionId: "q70" },
        { id: "innovative", label: "Innovative solutions", targetQuestionId: "q71" }
      ]
    },
    "q36": {
      id: "q36",
      label: "What solar applications interest you?",
      choices: [
        { id: "residential", label: "Residential solar", targetQuestionId: "q72" },
        { id: "utility", label: "Utility-scale solar", targetQuestionId: "q72" },
        { id: "portable", label: "Portable solar", targetQuestionId: "q73" }
      ]
    },
    "q37": {
      id: "q37",
      label: "What energy storage interests you?",
      choices: [
        { id: "battery", label: "Battery technology", targetQuestionId: "q74" },
        { id: "pumped", label: "Pumped hydro", targetQuestionId: "q74" },
        { id: "thermal", label: "Thermal storage", targetQuestionId: "q75" }
      ]
    },
    "q38": {
      id: "q38",
      label: "What carbon capture approaches interest you?",
      choices: [
        { id: "direct", label: "Direct air capture", targetQuestionId: "q76" },
        { id: "point", label: "Point source capture", targetQuestionId: "q76" },
        { id: "natural", label: "Natural solutions", targetQuestionId: "q77" }
      ]
    },
    "q39": {
      id: "q39",
      label: "What geoengineering approaches concern you?",
      choices: [
        { id: "solar", label: "Solar radiation management", targetQuestionId: "q78" },
        { id: "carbon", label: "Carbon dioxide removal", targetQuestionId: "q78" },
        { id: "ocean", label: "Ocean geoengineering", targetQuestionId: "q79" }
      ]
    },
    "q40": {
      id: "q40",
      label: "What lifestyle changes have you made?",
      choices: [
        { id: "transport", label: "Transportation changes", targetQuestionId: "q80" },
        { id: "energy", label: "Energy use changes", targetQuestionId: "q80" },
        { id: "consumption", label: "Consumption changes", targetQuestionId: "q81" }
      ]
    },
    "q41": {
      id: "q41",
      label: "What career changes are you considering?",
      choices: [
        { id: "green", label: "Green career", targetQuestionId: "q82" },
        { id: "transition", label: "Career transition", targetQuestionId: "q82" },
        { id: "skills", label: "New skills", targetQuestionId: "q83" }
      ]
    },
    "q42": {
      id: "q42",
      label: "What climate science topics do you want to explore?",
      choices: [
        { id: "basics", label: "Climate basics", targetQuestionId: "q84" },
        { id: "advanced", label: "Advanced topics", targetQuestionId: "q84" },
        { id: "applications", label: "Practical applications", targetQuestionId: "q85" }
      ]
    },
    "q43": {
      id: "q43",
      label: "What climate policy areas interest you?",
      choices: [
        { id: "international", label: "International policy", targetQuestionId: "q86" },
        { id: "national", label: "National policy", targetQuestionId: "q86" },
        { id: "local", label: "Local policy", targetQuestionId: "q87" }
      ]
    },
    "q44": {
      id: "q44",
      label: "What conservation strategies interest you?",
      choices: [
        { id: "protected", label: "Protected areas", targetQuestionId: "q88" },
        { id: "restoration", label: "Ecosystem restoration", targetQuestionId: "q88" },
        { id: "sustainable", label: "Sustainable use", targetQuestionId: "q89" }
      ]
    },
    "q45": {
      id: "q45",
      label: "What protected area types interest you?",
      choices: [
        { id: "marine", label: "Marine protected areas", targetQuestionId: "q90" },
        { id: "terrestrial", label: "Terrestrial reserves", targetQuestionId: "q90" },
        { id: "corridors", label: "Wildlife corridors", targetQuestionId: "q91" }
      ]
    },
    "q46": {
      id: "q46",
      label: "What water system issues concern you?",
      choices: [
        { id: "quality", label: "Water quality", targetQuestionId: "q92" },
        { id: "quantity", label: "Water quantity", targetQuestionId: "q92" },
        { id: "access", label: "Water access", targetQuestionId: "q93" }
      ]
    },
    "q47": {
      id: "q47",
      label: "What air quality issues concern you?",
      choices: [
        { id: "pollution", label: "Air pollution", targetQuestionId: "q94" },
        { id: "health", label: "Health impacts", targetQuestionId: "q94" },
        { id: "sources", label: "Pollution sources", targetQuestionId: "q95" }
      ]
    },
    "q48": {
      id: "q48",
      label: "What green job opportunities interest you?",
      choices: [
        { id: "renewable", label: "Renewable energy", targetQuestionId: "q96" },
        { id: "efficiency", label: "Energy efficiency", targetQuestionId: "q96" },
        { id: "conservation", label: "Conservation work", targetQuestionId: "q97" }
      ]
    },
    "q49": {
      id: "q49",
      label: "What sustainable investment areas interest you?",
      choices: [
        { id: "esg", label: "ESG investing", targetQuestionId: "q98" },
        { id: "impact", label: "Impact investing", targetQuestionId: "q98" },
        { id: "green", label: "Green bonds", targetQuestionId: "q99" }
      ]
    },
    "q50": {
      id: "q50",
      label: "What policy changes do you support?",
      choices: [
        { id: "carbon", label: "Carbon pricing", targetQuestionId: "q100" },
        { id: "renewable", label: "Renewable mandates", targetQuestionId: "q100" },
        { id: "efficiency", label: "Efficiency standards", targetQuestionId: "q101" }
      ]
    },
    "q51": {
      id: "q51",
      label: "What individual actions do you prioritize?",
      choices: [
        { id: "reduce", label: "Reduce consumption", targetQuestionId: "q102" },
        { id: "reuse", label: "Reuse and recycle", targetQuestionId: "q102" },
        { id: "advocate", label: "Advocate for change", targetQuestionId: "q103" }
      ]
    },
    "q52": {
      id: "q52",
      label: "What climate justice issues concern you?",
      choices: [
        { id: "vulnerable", label: "Vulnerable communities", targetQuestionId: "q104" },
        { id: "historical", label: "Historical responsibility", targetQuestionId: "q104" },
        { id: "future", label: "Future generations", targetQuestionId: "q105" }
      ]
    },
    "q53": {
      id: "q53",
      label: "What support systems do you need?",
      choices: [
        { id: "financial", label: "Financial support", targetQuestionId: "q106" },
        { id: "social", label: "Social support", targetQuestionId: "q106" },
        { id: "educational", label: "Educational support", targetQuestionId: "q107" }
      ]
    },
    "q54": {
      id: "q54",
      label: "What financial barriers do you face?",
      choices: [
        { id: "cost", label: "High costs", targetQuestionId: "q108" },
        { id: "access", label: "Limited access", targetQuestionId: "q108" },
        { id: "information", label: "Lack of information", targetQuestionId: "q109" }
      ]
    },
    "q55": {
      id: "q55",
      label: "What technology access issues do you face?",
      choices: [
        { id: "availability", label: "Limited availability", targetQuestionId: "q110" },
        { id: "affordability", label: "High costs", targetQuestionId: "q110" },
        { id: "knowledge", label: "Lack of knowledge", targetQuestionId: "q111" }
      ]
    },
    "q56": {
      id: "q56",
      label: "What youth activism inspires you?",
      choices: [
        { id: "strikes", label: "Climate strikes", targetQuestionId: "q112" },
        { id: "education", label: "Climate education", targetQuestionId: "q112" },
        { id: "innovation", label: "Youth innovation", targetQuestionId: "q113" }
      ]
    },
    "q57": {
      id: "q57",
      label: "What community actions inspire you?",
      choices: [
        { id: "local", label: "Local initiatives", targetQuestionId: "q114" },
        { id: "grassroots", label: "Grassroots movements", targetQuestionId: "q114" },
        { id: "collaboration", label: "Community collaboration", targetQuestionId: "q115" }
      ]
    },
    "q58": {
      id: "q58",
      label: "What climate movements inspire you?",
      choices: [
        { id: "global", label: "Global movements", targetQuestionId: "q116" },
        { id: "local", label: "Local movements", targetQuestionId: "q116" },
        { id: "intersectional", label: "Intersectional movements", targetQuestionId: "q117" }
      ]
    },
    "q59": {
      id: "q59",
      label: "What practical solutions inspire you?",
      choices: [
        { id: "technology", label: "Technological solutions", targetQuestionId: "q118" },
        { id: "nature", label: "Nature-based solutions", targetQuestionId: "q118" },
        { id: "social", label: "Social solutions", targetQuestionId: "q119" }
      ]
    },
    "q60": {
      id: "q60",
      label: "What local actions interest you?",
      choices: [
        { id: "community", label: "Community organizing", targetQuestionId: "q120" },
        { id: "policy", label: "Local policy", targetQuestionId: "q120" },
        { id: "projects", label: "Local projects", targetQuestionId: "q121" }
      ]
    },
    "q61": {
      id: "q61",
      label: "What education approaches interest you?",
      choices: [
        { id: "formal", label: "Formal education", targetQuestionId: "q122" },
        { id: "informal", label: "Informal learning", targetQuestionId: "q122" },
        { id: "peer", label: "Peer education", targetQuestionId: "q123" }
      ]
    },
    "q62": {
      id: "q62",
      label: "What community leadership appeals to you?",
      choices: [
        { id: "organizing", label: "Community organizing", targetQuestionId: "q124" },
        { id: "mentoring", label: "Mentoring others", targetQuestionId: "q124" },
        { id: "advocacy", label: "Local advocacy", targetQuestionId: "q125" }
      ]
    },
    "q63": {
      id: "q63",
      label: "What climate advocacy interests you?",
      choices: [
        { id: "policy", label: "Policy advocacy", targetQuestionId: "q126" },
        { id: "public", label: "Public awareness", targetQuestionId: "q126" },
        { id: "action", label: "Direct action", targetQuestionId: "q127" }
      ]
    },
    "q64": {
      id: "q64",
      label: "What atmospheric science interests you?",
      choices: [
        { id: "greenhouse", label: "Greenhouse gases", targetQuestionId: "q128" },
        { id: "weather", label: "Weather patterns", targetQuestionId: "q128" },
        { id: "models", label: "Climate models", targetQuestionId: "q129" }
      ]
    },
    "q65": {
      id: "q65",
      label: "What cryosphere science interests you?",
      choices: [
        { id: "ice", label: "Ice sheets", targetQuestionId: "q130" },
        { id: "glaciers", label: "Glaciers", targetQuestionId: "q130" },
        { id: "permafrost", label: "Permafrost", targetQuestionId: "q131" }
      ]
    },
    "q66": {
      id: "q66",
      label: "What science communication interests you?",
      choices: [
        { id: "public", label: "Public communication", targetQuestionId: "q132" },
        { id: "media", label: "Media engagement", targetQuestionId: "q132" },
        { id: "education", label: "Science education", targetQuestionId: "q133" }
      ]
    },
    "q67": {
      id: "q67",
      label: "What science integration interests you?",
      choices: [
        { id: "interdisciplinary", label: "Interdisciplinary work", targetQuestionId: "q134" },
        { id: "transdisciplinary", label: "Transdisciplinary approaches", targetQuestionId: "q134" },
        { id: "collaboration", label: "Science collaboration", targetQuestionId: "q135" }
      ]
    },
    "q68": {
      id: "q68",
      label: "What scientific journals do you follow?",
      choices: [
        { id: "nature", label: "Nature journals", targetQuestionId: "q136" },
        { id: "science", label: "Science journals", targetQuestionId: "q136" },
        { id: "specialized", label: "Specialized journals", targetQuestionId: "q137" }
      ]
    },
    "q69": {
      id: "q69",
      label: "What climate experts do you follow?",
      choices: [
        { id: "scientists", label: "Climate scientists", targetQuestionId: "q138" },
        { id: "communicators", label: "Science communicators", targetQuestionId: "q138" },
        { id: "activists", label: "Climate activists", targetQuestionId: "q139" }
      ]
    },
    "q70": {
      id: "q70",
      label: "What systems thinking approaches interest you?",
      choices: [
        { id: "complexity", label: "Complex systems", targetQuestionId: "q140" },
        { id: "resilience", label: "System resilience", targetQuestionId: "q140" },
        { id: "adaptation", label: "Adaptive systems", targetQuestionId: "q141" }
      ]
    },
    "q71": {
      id: "q71",
      label: "What innovative solutions interest you?",
      choices: [
        { id: "breakthrough", label: "Breakthrough technologies", targetQuestionId: "q142" },
        { id: "disruptive", label: "Disruptive innovations", targetQuestionId: "q142" },
        { id: "scalable", label: "Scalable solutions", targetQuestionId: "q143" }
      ]
    },
    "q72": {
      id: "q72",
      label: "What residential solar interests you?",
      choices: [
        { id: "rooftop", label: "Rooftop solar", targetQuestionId: "q144" },
        { id: "community", label: "Community solar", targetQuestionId: "q144" },
        { id: "storage", label: "Solar storage", targetQuestionId: "q145" }
      ]
    },
    "q73": {
      id: "q73",
      label: "What portable solar interests you?",
      choices: [
        { id: "panels", label: "Portable panels", targetQuestionId: "q146" },
        { id: "chargers", label: "Solar chargers", targetQuestionId: "q146" },
        { id: "generators", label: "Solar generators", targetQuestionId: "q147" }
      ]
    },
    "q74": {
      id: "q74",
      label: "What battery technology interests you?",
      choices: [
        { id: "lithium", label: "Lithium-ion", targetQuestionId: "q148" },
        { id: "flow", label: "Flow batteries", targetQuestionId: "q148" },
        { id: "solid", label: "Solid-state batteries", targetQuestionId: "q149" }
      ]
    },
    "q75": {
      id: "q75",
      label: "What thermal storage interests you?",
      choices: [
        { id: "molten", label: "Molten salt", targetQuestionId: "q150" },
        { id: "phase", label: "Phase change materials", targetQuestionId: "q150" },
        { id: "sensible", label: "Sensible heat storage", targetQuestionId: "q151" }
      ]
    },
    "q76": {
      id: "q76",
      label: "What direct air capture interests you?",
      choices: [
        { id: "technology", label: "DAC technology", targetQuestionId: "q152" },
        { id: "costs", label: "Cost reduction", targetQuestionId: "q152" },
        { id: "scaling", label: "Scaling up", targetQuestionId: "q153" }
      ]
    },
    "q77": {
      id: "q77",
      label: "What natural solutions interest you?",
      choices: [
        { id: "forests", label: "Forest restoration", targetQuestionId: "q154" },
        { id: "oceans", label: "Ocean restoration", targetQuestionId: "q154" },
        { id: "soils", label: "Soil carbon", targetQuestionId: "q155" }
      ]
    },
    "q78": {
      id: "q78",
      label: "What solar radiation management concerns you?",
      choices: [
        { id: "stratospheric", label: "Stratospheric aerosols", targetQuestionId: "q156" },
        { id: "marine", label: "Marine cloud brightening", targetQuestionId: "q156" },
        { id: "risks", label: "Potential risks", targetQuestionId: "q157" }
      ]
    },
    "q79": {
      id: "q79",
      label: "What ocean geoengineering concerns you?",
      choices: [
        { id: "fertilization", label: "Ocean fertilization", targetQuestionId: "q158" },
        { id: "alkalinity", label: "Ocean alkalinity", targetQuestionId: "q158" },
        { id: "upwelling", label: "Artificial upwelling", targetQuestionId: "q159" }
      ]
    },
    "q80": {
      id: "q80",
      label: "What transportation changes have you made?",
      choices: [
        { id: "electric", label: "Electric vehicles", targetQuestionId: "q160" },
        { id: "public", label: "Public transit", targetQuestionId: "q160" },
        { id: "active", label: "Active transport", targetQuestionId: "q161" }
      ]
    },
    "q81": {
      id: "q81",
      label: "What consumption changes have you made?",
      choices: [
        { id: "reduce", label: "Reduce consumption", targetQuestionId: "q162" },
        { id: "sustainable", label: "Sustainable products", targetQuestionId: "q162" },
        { id: "local", label: "Local products", targetQuestionId: "q163" }
      ]
    },
    "q82": {
      id: "q82",
      label: "What green career paths interest you?",
      choices: [
        { id: "renewable", label: "Renewable energy", targetQuestionId: "q164" },
        { id: "conservation", label: "Conservation", targetQuestionId: "q164" },
        { id: "policy", label: "Climate policy", targetQuestionId: "q165" }
      ]
    },
    "q83": {
      id: "q83",
      label: "What new skills do you want to develop?",
      choices: [
        { id: "technical", label: "Technical skills", targetQuestionId: "q166" },
        { id: "analytical", label: "Analytical skills", targetQuestionId: "q166" },
        { id: "communication", label: "Communication skills", targetQuestionId: "q167" }
      ]
    },
    "q84": {
      id: "q84",
      label: "What climate basics do you want to learn?",
      choices: [
        { id: "greenhouse", label: "Greenhouse effect", targetQuestionId: "q168" },
        { id: "carbon", label: "Carbon cycle", targetQuestionId: "q168" },
        { id: "impacts", label: "Climate impacts", targetQuestionId: "q169" }
      ]
    },
    "q85": {
      id: "q85",
      label: "What practical applications interest you?",
      choices: [
        { id: "adaptation", label: "Climate adaptation", targetQuestionId: "q170" },
        { id: "mitigation", label: "Climate mitigation", targetQuestionId: "q170" },
        { id: "resilience", label: "Climate resilience", targetQuestionId: "q171" }
      ]
    },
    "q86": {
      id: "q86",
      label: "What international policy interests you?",
      choices: [
        { id: "paris", label: "Paris Agreement", targetQuestionId: "q172" },
        { id: "unfccc", label: "UNFCCC process", targetQuestionId: "q172" },
        { id: "cooperation", label: "International cooperation", targetQuestionId: "q173" }
      ]
    },
    "q87": {
      id: "q87",
      label: "What local policy interests you?",
      choices: [
        { id: "municipal", label: "Municipal policy", targetQuestionId: "q174" },
        { id: "regional", label: "Regional policy", targetQuestionId: "q174" },
        { id: "community", label: "Community policy", targetQuestionId: "q175" }
      ]
    },
    "q88": {
      id: "q88",
      label: "What protected area types interest you?",
      choices: [
        { id: "national", label: "National parks", targetQuestionId: "q176" },
        { id: "marine", label: "Marine reserves", targetQuestionId: "q176" },
        { id: "wildlife", label: "Wildlife refuges", targetQuestionId: "q177" }
      ]
    },
    "q89": {
      id: "q89",
      label: "What sustainable use approaches interest you?",
      choices: [
        { id: "community", label: "Community management", targetQuestionId: "q178" },
        { id: "traditional", label: "Traditional knowledge", targetQuestionId: "q178" },
        { id: "science", label: "Science-based management", targetQuestionId: "q179" }
      ]
    },
    "q90": {
      id: "q90",
      label: "What marine protected areas interest you?",
      choices: [
        { id: "no-take", label: "No-take zones", targetQuestionId: "q180" },
        { id: "multiple", label: "Multiple-use zones", targetQuestionId: "q180" },
        { id: "network", label: "Marine networks", targetQuestionId: "q181" }
      ]
    },
    "q91": {
      id: "q91",
      label: "What wildlife corridor types interest you?",
      choices: [
        { id: "terrestrial", label: "Terrestrial corridors", targetQuestionId: "q182" },
        { id: "aquatic", label: "Aquatic corridors", targetQuestionId: "q182" },
        { id: "urban", label: "Urban corridors", targetQuestionId: "q183" }
      ]
    },
    "q92": {
      id: "q92",
      label: "What water quality issues concern you?",
      choices: [
        { id: "pollution", label: "Water pollution", targetQuestionId: "q184" },
        { id: "contamination", label: "Contamination", targetQuestionId: "q184" },
        { id: "treatment", label: "Water treatment", targetQuestionId: "q185" }
      ]
    },
    "q93": {
      id: "q93",
      label: "What water access issues concern you?",
      choices: [
        { id: "scarcity", label: "Water scarcity", targetQuestionId: "q186" },
        { id: "equity", label: "Water equity", targetQuestionId: "q186" },
        { id: "infrastructure", label: "Water infrastructure", targetQuestionId: "q187" }
      ]
    },
    "q94": {
      id: "q94",
      label: "What air pollution sources concern you?",
      choices: [
        { id: "transport", label: "Transportation", targetQuestionId: "q188" },
        { id: "industry", label: "Industry", targetQuestionId: "q188" },
        { id: "energy", label: "Energy production", targetQuestionId: "q189" }
      ]
    },
    "q95": {
      id: "q95",
      label: "What pollution source types concern you?",
      choices: [
        { id: "point", label: "Point sources", targetQuestionId: "q190" },
        { id: "nonpoint", label: "Non-point sources", targetQuestionId: "q190" },
        { id: "mobile", label: "Mobile sources", targetQuestionId: "q191" }
      ]
    },
    "q96": {
      id: "q96",
      label: "What renewable energy jobs interest you?",
      choices: [
        { id: "solar", label: "Solar industry", targetQuestionId: "q192" },
        { id: "wind", label: "Wind industry", targetQuestionId: "q192" },
        { id: "storage", label: "Energy storage", targetQuestionId: "q193" }
      ]
    },
    "q97": {
      id: "q97",
      label: "What conservation work interests you?",
      choices: [
        { id: "field", label: "Field work", targetQuestionId: "q194" },
        { id: "research", label: "Research", targetQuestionId: "q194" },
        { id: "management", label: "Management", targetQuestionId: "q195" }
      ]
    },
    "q98": {
      id: "q98",
      label: "What ESG investing interests you?",
      choices: [
        { id: "environmental", label: "Environmental factors", targetQuestionId: "q196" },
        { id: "social", label: "Social factors", targetQuestionId: "q196" },
        { id: "governance", label: "Governance factors", targetQuestionId: "q197" }
      ]
    },
    "q99": {
      id: "q99",
      label: "What green bond types interest you?",
      choices: [
        { id: "sovereign", label: "Sovereign bonds", targetQuestionId: "q198" },
        { id: "corporate", label: "Corporate bonds", targetQuestionId: "q198" },
        { id: "municipal", label: "Municipal bonds", targetQuestionId: "q199" }
      ]
    },
    "q100": {
      id: "q100",
      label: "What carbon pricing approaches interest you?",
      choices: [
        { id: "tax", label: "Carbon tax", targetQuestionId: "q200" },
        { id: "trading", label: "Carbon trading", targetQuestionId: "q200" },
        { id: "hybrid", label: "Hybrid approaches", targetQuestionId: "q201" }
      ]
    },
    "q101": {
      id: "q101",
      label: "What efficiency standards interest you?",
      choices: [
        { id: "building", label: "Building standards", targetQuestionId: "q202" },
        { id: "vehicle", label: "Vehicle standards", targetQuestionId: "q202" },
        { id: "appliance", label: "Appliance standards", targetQuestionId: "q203" }
      ]
    },
    "q102": {
      id: "q102",
      label: "What consumption reduction strategies interest you?",
      choices: [
        { id: "minimalism", label: "Minimalism", targetQuestionId: "q204" },
        { id: "sharing", label: "Sharing economy", targetQuestionId: "q204" },
        { id: "circular", label: "Circular economy", targetQuestionId: "q205" }
      ]
    },
    "q103": {
      id: "q103",
      label: "What advocacy approaches interest you?",
      choices: [
        { id: "political", label: "Political advocacy", targetQuestionId: "q206" },
        { id: "public", label: "Public advocacy", targetQuestionId: "q206" },
        { id: "grassroots", label: "Grassroots advocacy", targetQuestionId: "q207" }
      ]
    },
    "q104": {
      id: "q104",
      label: "What vulnerable community issues concern you?",
      choices: [
        { id: "displacement", label: "Climate displacement", targetQuestionId: "q208" },
        { id: "health", label: "Health impacts", targetQuestionId: "q208" },
        { id: "economic", label: "Economic impacts", targetQuestionId: "q209" }
      ]
    },
    "q105": {
      id: "q105",
      label: "What future generation concerns do you have?",
      choices: [
        { id: "inheritance", label: "Environmental inheritance", targetQuestionId: "q210" },
        { id: "preparation", label: "Preparation for climate change", targetQuestionId: "q210" },
        { id: "responsibility", label: "Intergenerational responsibility", targetQuestionId: "q211" }
      ]
    },
    "q106": {
      id: "q106",
      label: "What financial support do you need?",
      choices: [
        { id: "grants", label: "Grants and funding", targetQuestionId: "q212" },
        { id: "loans", label: "Low-interest loans", targetQuestionId: "q212" },
        { id: "incentives", label: "Financial incentives", targetQuestionId: "q213" }
      ]
    },
    "q107": {
      id: "q107",
      label: "What educational support do you need?",
      choices: [
        { id: "training", label: "Training programs", targetQuestionId: "q214" },
        { id: "resources", label: "Educational resources", targetQuestionId: "q214" },
        { id: "mentorship", label: "Mentorship programs", targetQuestionId: "q215" }
      ]
    },
    "q108": {
      id: "q108",
      label: "What cost barriers do you face?",
      choices: [
        { id: "upfront", label: "High upfront costs", targetQuestionId: "q216" },
        { id: "ongoing", label: "Ongoing costs", targetQuestionId: "q216" },
        { id: "hidden", label: "Hidden costs", targetQuestionId: "q217" }
      ]
    },
    "q109": {
      id: "q109",
      label: "What information do you need?",
      choices: [
        { id: "options", label: "Available options", targetQuestionId: "q218" },
        { id: "costs", label: "Cost information", targetQuestionId: "q218" },
        { id: "benefits", label: "Benefit information", targetQuestionId: "q219" }
      ]
    },
    "q110": {
      id: "q110",
      label: "What technology availability issues do you face?",
      choices: [
        { id: "access", label: "Limited access", targetQuestionId: "q220" },
        { id: "quality", label: "Quality concerns", targetQuestionId: "q220" },
        { id: "support", label: "Support issues", targetQuestionId: "q221" }
      ]
    },
    "q111": {
      id: "q111",
      label: "What knowledge do you need?",
      choices: [
        { id: "technical", label: "Technical knowledge", targetQuestionId: "q222" },
        { id: "practical", label: "Practical knowledge", targetQuestionId: "q222" },
        { id: "maintenance", label: "Maintenance knowledge", targetQuestionId: "q223" }
      ]
    },
    "q112": {
      id: "q112",
      label: "What climate strikes inspire you?",
      choices: [
        { id: "global", label: "Global strikes", targetQuestionId: "q224" },
        { id: "local", label: "Local strikes", targetQuestionId: "q224" },
        { id: "youth", label: "Youth strikes", targetQuestionId: "q225" }
      ]
    },
    "q113": {
      id: "q113",
      label: "What youth innovation inspires you?",
      choices: [
        { id: "technology", label: "Youth technology", targetQuestionId: "q226" },
        { id: "solutions", label: "Youth solutions", targetQuestionId: "q226" },
        { id: "leadership", label: "Youth leadership", targetQuestionId: "q227" }
      ]
    },
    "q114": {
      id: "q114",
      label: "What local initiatives inspire you?",
      choices: [
        { id: "community", label: "Community gardens", targetQuestionId: "q228" },
        { id: "energy", label: "Community energy", targetQuestionId: "q228" },
        { id: "transport", label: "Community transport", targetQuestionId: "q229" }
      ]
    },
    "q115": {
      id: "q115",
      label: "What community collaboration inspires you?",
      choices: [
        { id: "partnerships", label: "Community partnerships", targetQuestionId: "q230" },
        { id: "networks", label: "Community networks", targetQuestionId: "q230" },
        { id: "cooperation", label: "Community cooperation", targetQuestionId: "q231" }
      ]
    },
    "q116": {
      id: "q116",
      label: "What global movements inspire you?",
      choices: [
        { id: "fridays", label: "Fridays for Future", targetQuestionId: "q232" },
        { id: "extinction", label: "Extinction Rebellion", targetQuestionId: "q232" },
        { id: "sunrise", label: "Sunrise Movement", targetQuestionId: "q233" }
      ]
    },
    "q117": {
      id: "q117",
      label: "What intersectional movements inspire you?",
      choices: [
        { id: "climate", label: "Climate justice", targetQuestionId: "q234" },
        { id: "environmental", label: "Environmental justice", targetQuestionId: "q234" },
        { id: "social", label: "Social justice", targetQuestionId: "q235" }
      ]
    },
    "q118": {
      id: "q118",
      label: "What technological solutions inspire you?",
      choices: [
        { id: "renewable", label: "Renewable technology", targetQuestionId: "q236" },
        { id: "efficiency", label: "Efficiency technology", targetQuestionId: "q236" },
        { id: "storage", label: "Storage technology", targetQuestionId: "q237" }
      ]
    },
    "q119": {
      id: "q119",
      label: "What social solutions inspire you?",
      choices: [
        { id: "community", label: "Community solutions", targetQuestionId: "q238" },
        { id: "behavioral", label: "Behavioral solutions", targetQuestionId: "q238" },
        { id: "policy", label: "Policy solutions", targetQuestionId: "q239" }
      ]
    },
    "q120": {
      id: "q120",
      label: "What community organizing interests you?",
      choices: [
        { id: "grassroots", label: "Grassroots organizing", targetQuestionId: "q240" },
        { id: "coalition", label: "Coalition building", targetQuestionId: "q240" },
        { id: "mobilization", label: "Community mobilization", targetQuestionId: "q241" }
      ]
    },
    "q121": {
      id: "q121",
      label: "What local projects interest you?",
      choices: [
        { id: "renewable", label: "Local renewable energy", targetQuestionId: "q242" },
        { id: "conservation", label: "Local conservation", targetQuestionId: "q242" },
        { id: "education", label: "Local education", targetQuestionId: "q243" }
      ]
    },
    "q122": {
      id: "q122",
      label: "What formal education interests you?",
      choices: [
        { id: "university", label: "University programs", targetQuestionId: "q244" },
        { id: "certification", label: "Certification programs", targetQuestionId: "q244" },
        { id: "degree", label: "Degree programs", targetQuestionId: "q245" }
      ]
    },
    "q123": {
      id: "q123",
      label: "What peer education interests you?",
      choices: [
        { id: "workshops", label: "Peer workshops", targetQuestionId: "q246" },
        { id: "mentoring", label: "Peer mentoring", targetQuestionId: "q246" },
        { id: "networks", label: "Peer networks", targetQuestionId: "q247" }
      ]
    },
    "q124": {
      id: "q124",
      label: "What community organizing interests you?",
      choices: [
        { id: "outreach", label: "Community outreach", targetQuestionId: "q248" },
        { id: "engagement", label: "Community engagement", targetQuestionId: "q248" },
        { id: "mobilization", label: "Community mobilization", targetQuestionId: "q249" }
      ]
    },
    "q125": {
      id: "q125",
      label: "What local advocacy interests you?",
      choices: [
        { id: "policy", label: "Local policy advocacy", targetQuestionId: "q250" },
        { id: "public", label: "Public advocacy", targetQuestionId: "q250" },
        { id: "media", label: "Media advocacy", targetQuestionId: "q251" }
      ]
    },
    "q126": {
      id: "q126",
      label: "What policy advocacy interests you?",
      choices: [
        { id: "lobbying", label: "Lobbying", targetQuestionId: "q252" },
        { id: "campaigning", label: "Campaigning", targetQuestionId: "q252" },
        { id: "coalition", label: "Coalition building", targetQuestionId: "q253" }
      ]
    },
    "q127": {
      id: "q127",
      label: "What direct action interests you?",
      choices: [
        { id: "protests", label: "Protests", targetQuestionId: "q254" },
        { id: "civil", label: "Civil disobedience", targetQuestionId: "q254" },
        { id: "creative", label: "Creative action", targetQuestionId: "q255" }
      ]
    },
    "q128": {
      id: "q128",
      label: "What greenhouse gas topics interest you?",
      choices: [
        { id: "co2", label: "Carbon dioxide", targetQuestionId: "q256" },
        { id: "methane", label: "Methane", targetQuestionId: "q256" },
        { id: "nitrous", label: "Nitrous oxide", targetQuestionId: "q257" }
      ]
    },
    "q129": {
      id: "q129",
      label: "What climate models interest you?",
      choices: [
        { id: "global", label: "Global models", targetQuestionId: "q258" },
        { id: "regional", label: "Regional models", targetQuestionId: "q258" },
        { id: "scenarios", label: "Scenario modeling", targetQuestionId: "q259" }
      ]
    },
    "q130": {
      id: "q130",
      label: "What ice sheet topics interest you?",
      choices: [
        { id: "antarctic", label: "Antarctic ice sheet", targetQuestionId: "q260" },
        { id: "greenland", label: "Greenland ice sheet", targetQuestionId: "q260" },
        { id: "sea", label: "Sea level rise", targetQuestionId: "q261" }
      ]
    },
    "q131": {
      id: "q131",
      label: "What permafrost topics interest you?",
      choices: [
        { id: "thawing", label: "Permafrost thawing", targetQuestionId: "q262" },
        { id: "carbon", label: "Permafrost carbon", targetQuestionId: "q262" },
        { id: "impacts", label: "Thawing impacts", targetQuestionId: "q263" }
      ]
    },
    "q132": {
      id: "q132",
      label: "What public communication interests you?",
      choices: [
        { id: "outreach", label: "Public outreach", targetQuestionId: "q264" },
        { id: "education", label: "Public education", targetQuestionId: "q264" },
        { id: "engagement", label: "Public engagement", targetQuestionId: "q265" }
      ]
    },
    "q133": {
      id: "q133",
      label: "What science education interests you?",
      choices: [
        { id: "formal", label: "Formal education", targetQuestionId: "q266" },
        { id: "informal", label: "Informal education", targetQuestionId: "q266" },
        { id: "lifelong", label: "Lifelong learning", targetQuestionId: "q267" }
      ]
    },
    "q134": {
      id: "q134",
      label: "What interdisciplinary work interests you?",
      choices: [
        { id: "science", label: "Science integration", targetQuestionId: "q268" },
        { id: "policy", label: "Science-policy integration", targetQuestionId: "q268" },
        { id: "practice", label: "Science-practice integration", targetQuestionId: "q269" }
      ]
    },
    "q135": {
      id: "q135",
      label: "What science collaboration interests you?",
      choices: [
        { id: "international", label: "International collaboration", targetQuestionId: "q270" },
        { id: "interdisciplinary", label: "Interdisciplinary collaboration", targetQuestionId: "q270" },
        { id: "stakeholder", label: "Stakeholder collaboration", targetQuestionId: "q271" }
      ]
    },
    "q136": {
      id: "q136",
      label: "What Nature journals do you follow?",
      choices: [
        { id: "climate", label: "Nature Climate Change", targetQuestionId: "q272" },
        { id: "environment", label: "Nature Environment", targetQuestionId: "q272" },
        { id: "energy", label: "Nature Energy", targetQuestionId: "q273" }
      ]
    },
    "q137": {
      id: "q137",
      label: "What specialized journals do you follow?",
      choices: [
        { id: "atmospheric", label: "Atmospheric journals", targetQuestionId: "q274" },
        { id: "ocean", label: "Ocean journals", targetQuestionId: "q274" },
        { id: "cryosphere", label: "Cryosphere journals", targetQuestionId: "q275" }
      ]
    },
    "q138": {
      id: "q138",
      label: "What climate scientists do you follow?",
      choices: [
        { id: "ipcc", label: "IPCC scientists", targetQuestionId: "q276" },
        { id: "academic", label: "Academic scientists", targetQuestionId: "q276" },
        { id: "research", label: "Research scientists", targetQuestionId: "q277" }
      ]
    },
    "q139": {
      id: "q139",
      label: "What climate activists do you follow?",
      choices: [
        { id: "youth", label: "Youth activists", targetQuestionId: "q278" },
        { id: "indigenous", label: "Indigenous activists", targetQuestionId: "q278" },
        { id: "community", label: "Community activists", targetQuestionId: "q279" }
      ]
    },
    "q140": {
      id: "q140",
      label: "What complex systems interest you?",
      choices: [
        { id: "climate", label: "Climate systems", targetQuestionId: "q280" },
        { id: "social", label: "Social systems", targetQuestionId: "q280" },
        { id: "ecological", label: "Ecological systems", targetQuestionId: "q281" }
      ]
    },
    "q141": {
      id: "q141",
      label: "What adaptive systems interest you?",
      choices: [
        { id: "resilience", label: "System resilience", targetQuestionId: "q282" },
        { id: "transformation", label: "System transformation", targetQuestionId: "q282" },
        { id: "learning", label: "Adaptive learning", targetQuestionId: "q283" }
      ]
    },
    "q142": {
      id: "q142",
      label: "What breakthrough technologies interest you?",
      choices: [
        { id: "fusion", label: "Nuclear fusion", targetQuestionId: "q284" },
        { id: "storage", label: "Advanced storage", targetQuestionId: "q284" },
        { id: "capture", label: "Carbon capture", targetQuestionId: "q285" }
      ]
    },
    "q143": {
      id: "q143",
      label: "What scalable solutions interest you?",
      choices: [
        { id: "renewable", label: "Scalable renewables", targetQuestionId: "q286" },
        { id: "efficiency", label: "Scalable efficiency", targetQuestionId: "q286" },
        { id: "storage", label: "Scalable storage", targetQuestionId: "q287" }
      ]
    },
    "q144": {
      id: "q144",
      label: "What rooftop solar interests you?",
      choices: [
        { id: "residential", label: "Residential rooftop", targetQuestionId: "q288" },
        { id: "commercial", label: "Commercial rooftop", targetQuestionId: "q288" },
        { id: "industrial", label: "Industrial rooftop", targetQuestionId: "q289" }
      ]
    },
    "q145": {
      id: "q145",
      label: "What solar storage interests you?",
      choices: [
        { id: "battery", label: "Solar batteries", targetQuestionId: "q290" },
        { id: "grid", label: "Grid storage", targetQuestionId: "q290" },
        { id: "offgrid", label: "Off-grid storage", targetQuestionId: "q291" }
      ]
    },
    "q146": {
      id: "q146",
      label: "What portable panels interest you?",
      choices: [
        { id: "foldable", label: "Foldable panels", targetQuestionId: "q292" },
        { id: "flexible", label: "Flexible panels", targetQuestionId: "q292" },
        { id: "lightweight", label: "Lightweight panels", targetQuestionId: "q293" }
      ]
    },
    "q147": {
      id: "q147",
      label: "What solar generators interest you?",
      choices: [
        { id: "portable", label: "Portable generators", targetQuestionId: "q294" },
        { id: "stationary", label: "Stationary generators", targetQuestionId: "q294" },
        { id: "hybrid", label: "Hybrid generators", targetQuestionId: "q295" }
      ]
    },
    "q148": {
      id: "q148",
      label: "What lithium-ion applications interest you?",
      choices: [
        { id: "vehicles", label: "Electric vehicles", targetQuestionId: "q296" },
        { id: "grid", label: "Grid storage", targetQuestionId: "q296" },
        { id: "portable", label: "Portable devices", targetQuestionId: "q297" }
      ]
    },
    "q149": {
      id: "q149",
      label: "What solid-state battery applications interest you?",
      choices: [
        { id: "vehicles", label: "Electric vehicles", targetQuestionId: "q298" },
        { id: "grid", label: "Grid storage", targetQuestionId: "q298" },
        { id: "portable", label: "Portable devices", targetQuestionId: "q299" }
      ]
    },
    "q150": {
      id: "q150",
      label: "What molten salt applications interest you?",
      choices: [
        { id: "solar", label: "Solar thermal", targetQuestionId: "q300" },
        { id: "nuclear", label: "Nuclear storage", targetQuestionId: "q300" },
        { id: "industrial", label: "Industrial heat", targetQuestionId: "q301" }
      ]
    },
    "q151": {
      id: "q151",
      label: "What sensible heat storage interests you?",
      choices: [
        { id: "water", label: "Water storage", targetQuestionId: "q302" },
        { id: "rock", label: "Rock storage", targetQuestionId: "q302" },
        { id: "concrete", label: "Concrete storage", targetQuestionId: "q303" }
      ]
    },
    "q152": {
      id: "q152",
      label: "What DAC technology interests you?",
      choices: [
        { id: "solid", label: "Solid sorbents", targetQuestionId: "q304" },
        { id: "liquid", label: "Liquid sorbents", targetQuestionId: "q304" },
        { id: "membrane", label: "Membrane separation", targetQuestionId: "q305" }
      ]
    },
    "q153": {
      id: "q153",
      label: "What DAC scaling interests you?",
      choices: [
        { id: "commercial", label: "Commercial scale", targetQuestionId: "q306" },
        { id: "industrial", label: "Industrial scale", targetQuestionId: "q306" },
        { id: "global", label: "Global deployment", targetQuestionId: "q307" }
      ]
    },
    "q154": {
      id: "q154",
      label: "What forest restoration interests you?",
      choices: [
        { id: "reforestation", label: "Reforestation", targetQuestionId: "q308" },
        { id: "afforestation", label: "Afforestation", targetQuestionId: "q308" },
        { id: "regeneration", label: "Natural regeneration", targetQuestionId: "q309" }
      ]
    },
    "q155": {
      id: "q155",
      label: "What soil carbon interests you?",
      choices: [
        { id: "agriculture", label: "Agricultural soils", targetQuestionId: "q310" },
        { id: "forest", label: "Forest soils", targetQuestionId: "q310" },
        { id: "grassland", label: "Grassland soils", targetQuestionId: "q311" }
      ]
    },
    "q156": {
      id: "q156",
      label: "What stratospheric aerosol concerns you?",
      choices: [
        { id: "ozone", label: "Ozone depletion", targetQuestionId: "q312" },
        { id: "precipitation", label: "Precipitation changes", targetQuestionId: "q312" },
        { id: "health", label: "Health impacts", targetQuestionId: "q313" }
      ]
    },
    "q157": {
      id: "q157",
      label: "What SRM risks concern you?",
      choices: [
        { id: "termination", label: "Termination shock", targetQuestionId: "q314" },
        { id: "governance", label: "Governance issues", targetQuestionId: "q314" },
        { id: "unintended", label: "Unintended consequences", targetQuestionId: "q315" }
      ]
    },
    "q158": {
      id: "q158",
      label: "What ocean fertilization concerns you?",
      choices: [
        { id: "ecosystem", label: "Ecosystem impacts", targetQuestionId: "q316" },
        { id: "effectiveness", label: "Effectiveness", targetQuestionId: "q316" },
        { id: "governance", label: "Governance issues", targetQuestionId: "q317" }
      ]
    },
    "q159": {
      id: "q159",
      label: "What artificial upwelling concerns you?",
      choices: [
        { id: "energy", label: "Energy requirements", targetQuestionId: "q318" },
        { id: "ecosystem", label: "Ecosystem impacts", targetQuestionId: "q318" },
        { id: "scaling", label: "Scaling challenges", targetQuestionId: "q319" }
      ]
    },
    "q160": {
      id: "q160",
      label: "What electric vehicle aspects interest you?",
      choices: [
        { id: "battery", label: "Battery technology", targetQuestionId: "q320" },
        { id: "charging", label: "Charging infrastructure", targetQuestionId: "q320" },
        { id: "range", label: "Range and performance", targetQuestionId: "q321" }
      ]
    },
    "q161": {
      id: "q161",
      label: "What active transport interests you?",
      choices: [
        { id: "cycling", label: "Cycling infrastructure", targetQuestionId: "q322" },
        { id: "walking", label: "Walking infrastructure", targetQuestionId: "q322" },
        { id: "micromobility", label: "Micromobility", targetQuestionId: "q323" }
      ]
    },
    "q162": {
      id: "q162",
      label: "What sustainable products interest you?",
      choices: [
        { id: "certified", label: "Certified products", targetQuestionId: "q324" },
        { id: "local", label: "Local products", targetQuestionId: "q324" },
        { id: "recycled", label: "Recycled products", targetQuestionId: "q325" }
      ]
    },
    "q163": {
      id: "q163",
      label: "What local products interest you?",
      choices: [
        { id: "food", label: "Local food", targetQuestionId: "q326" },
        { id: "materials", label: "Local materials", targetQuestionId: "q326" },
        { id: "services", label: "Local services", targetQuestionId: "q327" }
      ]
    },
    "q164": {
      id: "q164",
      label: "What renewable energy careers interest you?",
      choices: [
        { id: "engineering", label: "Engineering", targetQuestionId: "q328" },
        { id: "installation", label: "Installation", targetQuestionId: "q328" },
        { id: "maintenance", label: "Maintenance", targetQuestionId: "q329" }
      ]
    },
    "q165": {
      id: "q165",
      label: "What climate policy careers interest you?",
      choices: [
        { id: "analysis", label: "Policy analysis", targetQuestionId: "q330" },
        { id: "advocacy", label: "Policy advocacy", targetQuestionId: "q330" },
        { id: "implementation", label: "Policy implementation", targetQuestionId: "q331" }
      ]
    },
    "q166": {
      id: "q166",
      label: "What technical skills interest you?",
      choices: [
        { id: "engineering", label: "Engineering skills", targetQuestionId: "q332" },
        { id: "programming", label: "Programming skills", targetQuestionId: "q332" },
        { id: "data", label: "Data analysis skills", targetQuestionId: "q333" }
      ]
    },
    "q167": {
      id: "q167",
      label: "What communication skills interest you?",
      choices: [
        { id: "writing", label: "Technical writing", targetQuestionId: "q334" },
        { id: "presentation", label: "Presentation skills", targetQuestionId: "q334" },
        { id: "media", label: "Media communication", targetQuestionId: "q335" }
      ]
    },
    "q168": {
      id: "q168",
      label: "What greenhouse effect topics interest you?",
      choices: [
        { id: "mechanism", label: "Mechanism", targetQuestionId: "q336" },
        { id: "gases", label: "Greenhouse gases", targetQuestionId: "q336" },
        { id: "enhancement", label: "Enhanced greenhouse effect", targetQuestionId: "q337" }
      ]
    },
    "q169": {
      id: "q169",
      label: "What climate impacts interest you?",
      choices: [
        { id: "temperature", label: "Temperature rise", targetQuestionId: "q338" },
        { id: "precipitation", label: "Precipitation changes", targetQuestionId: "q338" },
        { id: "extremes", label: "Extreme weather", targetQuestionId: "q339" }
      ]
    },
    "q170": {
      id: "q170",
      label: "What climate adaptation interests you?",
      choices: [
        { id: "infrastructure", label: "Infrastructure adaptation", targetQuestionId: "q340" },
        { id: "ecosystem", label: "Ecosystem adaptation", targetQuestionId: "q340" },
        { id: "social", label: "Social adaptation", targetQuestionId: "q341" }
      ]
    },
    "q171": {
      id: "q171",
      label: "What climate resilience interests you?",
      choices: [
        { id: "community", label: "Community resilience", targetQuestionId: "q342" },
        { id: "infrastructure", label: "Infrastructure resilience", targetQuestionId: "q342" },
        { id: "ecosystem", label: "Ecosystem resilience", targetQuestionId: "q343" }
      ]
    },
    "q172": {
      id: "q172",
      label: "What Paris Agreement aspects interest you?",
      choices: [
        { id: "ndcs", label: "Nationally Determined Contributions", targetQuestionId: "q344" },
        { id: "temperature", label: "Temperature goals", targetQuestionId: "q344" },
        { id: "finance", label: "Climate finance", targetQuestionId: "q345" }
      ]
    },
    "q173": {
      id: "q173",
      label: "What international cooperation interests you?",
      choices: [
        { id: "unfccc", label: "UNFCCC process", targetQuestionId: "q346" },
        { id: "bilateral", label: "Bilateral cooperation", targetQuestionId: "q346" },
        { id: "multilateral", label: "Multilateral cooperation", targetQuestionId: "q347" }
      ]
    },
    "q174": {
      id: "q174",
      label: "What municipal policy interests you?",
      choices: [
        { id: "energy", label: "Municipal energy policy", targetQuestionId: "q348" },
        { id: "transport", label: "Transportation policy", targetQuestionId: "q348" },
        { id: "planning", label: "Urban planning", targetQuestionId: "q349" }
      ]
    },
    "q175": {
      id: "q175",
      label: "What community policy interests you?",
      choices: [
        { id: "local", label: "Local initiatives", targetQuestionId: "q350" },
        { id: "neighborhood", label: "Neighborhood policy", targetQuestionId: "q350" },
        { id: "grassroots", label: "Grassroots policy", targetQuestionId: "q351" }
      ]
    },
    "q176": {
      id: "q176",
      label: "What national park types interest you?",
      choices: [
        { id: "wilderness", label: "Wilderness areas", targetQuestionId: "q352" },
        { id: "recreation", label: "Recreation areas", targetQuestionId: "q352" },
        { id: "cultural", label: "Cultural areas", targetQuestionId: "q353" }
      ]
    },
    "q177": {
      id: "q177",
      label: "What wildlife refuge types interest you?",
      choices: [
        { id: "migratory", label: "Migratory bird refuges", targetQuestionId: "q354" },
        { id: "endangered", label: "Endangered species refuges", targetQuestionId: "q354" },
        { id: "wetland", label: "Wetland refuges", targetQuestionId: "q355" }
      ]
    },
    "q178": {
      id: "q178",
      label: "What community management interests you?",
      choices: [
        { id: "cooperative", label: "Cooperative management", targetQuestionId: "q356" },
        { id: "participatory", label: "Participatory management", targetQuestionId: "q356" },
        { id: "adaptive", label: "Adaptive management", targetQuestionId: "q357" }
      ]
    },
    "q179": {
      id: "q179",
      label: "What science-based management interests you?",
      choices: [
        { id: "monitoring", label: "Scientific monitoring", targetQuestionId: "q358" },
        { id: "research", label: "Research-based decisions", targetQuestionId: "q358" },
        { id: "evaluation", label: "Scientific evaluation", targetQuestionId: "q359" }
      ]
    },
    "q180": {
      id: "q180",
      label: "What no-take zone types interest you?",
      choices: [
        { id: "fishing", label: "Fishing closures", targetQuestionId: "q360" },
        { id: "mining", label: "Mining closures", targetQuestionId: "q360" },
        { id: "extraction", label: "Resource extraction closures", targetQuestionId: "q361" }
      ]
    },
    "q181": {
      id: "q181",
      label: "What marine network types interest you?",
      choices: [
        { id: "regional", label: "Regional networks", targetQuestionId: "q362" },
        { id: "global", label: "Global networks", targetQuestionId: "q362" },
        { id: "transboundary", label: "Transboundary networks", targetQuestionId: "q363" }
      ]
    },
    "q182": {
      id: "q182",
      label: "What terrestrial corridor types interest you?",
      choices: [
        { id: "wildlife", label: "Wildlife corridors", targetQuestionId: "q364" },
        { id: "migration", label: "Migration corridors", targetQuestionId: "q364" },
        { id: "habitat", label: "Habitat corridors", targetQuestionId: "q365" }
      ]
    },
    "q183": {
      id: "q183",
      label: "What urban corridor types interest you?",
      choices: [
        { id: "green", label: "Green corridors", targetQuestionId: "q366" },
        { id: "blue", label: "Blue corridors", targetQuestionId: "q366" },
        { id: "brown", label: "Brownfield corridors", targetQuestionId: "q367" }
      ]
    },
    "q184": {
      id: "q184",
      label: "What water pollution sources concern you?",
      choices: [
        { id: "point", label: "Point source pollution", targetQuestionId: "q368" },
        { id: "nonpoint", label: "Non-point source pollution", targetQuestionId: "q368" },
        { id: "diffuse", label: "Diffuse pollution", targetQuestionId: "q369" }
      ]
    },
    "q185": {
      id: "q185",
      label: "What water treatment interests you?",
      choices: [
        { id: "conventional", label: "Conventional treatment", targetQuestionId: "q370" },
        { id: "advanced", label: "Advanced treatment", targetQuestionId: "q370" },
        { id: "natural", label: "Natural treatment", targetQuestionId: "q371" }
      ]
    },
    "q186": {
      id: "q186",
      label: "What water scarcity issues concern you?",
      choices: [
        { id: "physical", label: "Physical scarcity", targetQuestionId: "q372" },
        { id: "economic", label: "Economic scarcity", targetQuestionId: "q372" },
        { id: "institutional", label: "Institutional scarcity", targetQuestionId: "q373" }
      ]
    },
    "q187": {
      id: "q187",
      label: "What water infrastructure interests you?",
      choices: [
        { id: "treatment", label: "Treatment infrastructure", targetQuestionId: "q374" },
        { id: "distribution", label: "Distribution infrastructure", targetQuestionId: "q374" },
        { id: "storage", label: "Storage infrastructure", targetQuestionId: "q375" }
      ]
    },
    "q188": {
      id: "q188",
      label: "What transportation pollution concerns you?",
      choices: [
        { id: "vehicles", label: "Vehicle emissions", targetQuestionId: "q376" },
        { id: "aviation", label: "Aviation emissions", targetQuestionId: "q376" },
        { id: "shipping", label: "Shipping emissions", targetQuestionId: "q377" }
      ]
    },
    "q189": {
      id: "q189",
      label: "What energy production pollution concerns you?",
      choices: [
        { id: "coal", label: "Coal power plants", targetQuestionId: "q378" },
        { id: "gas", label: "Natural gas plants", targetQuestionId: "q378" },
        { id: "oil", label: "Oil refineries", targetQuestionId: "q379" }
      ]
    },
    "q190": {
      id: "q190",
      label: "What point source pollution concerns you?",
      choices: [
        { id: "industrial", label: "Industrial sources", targetQuestionId: "q380" },
        { id: "power", label: "Power plants", targetQuestionId: "q380" },
        { id: "waste", label: "Waste facilities", targetQuestionId: "q381" }
      ]
    },
    "q191": {
      id: "q191",
      label: "What mobile source pollution concerns you?",
      choices: [
        { id: "vehicles", label: "Motor vehicles", targetQuestionId: "q382" },
        { id: "aircraft", label: "Aircraft", targetQuestionId: "q382" },
        { id: "ships", label: "Ships", targetQuestionId: "q383" }
      ]
    }
  }
};