"""Weighted field detection rules (research CV/job field classifier)."""

FIELD_RULES: dict = {}


def add_field_rules(field_name: str, weights: dict) -> None:
    FIELD_RULES[field_name] = weights


add_field_rules("IT & Software", {
    "weight_3": [
        # --- Core Engineering & Specialized Titles ---
        "software engineer", "software developer", "frontend developer", "backend developer", "backend engineer","software engineers",
        "back-end developer", "full stack developer", "full-stack developer", "web developer","full stack engineer","full-stack engineer","web developers",
        "junior web developer", "senior web developer", "website developer",
        "web application developer", "web app developer", "ui developer", "wordpress developer",
        "php developer", "laravel developer", ".net developer", "dotnet developer","software development",
        "c# developer", "data scientist", "data engineer", "bi analyst","software engineering","software developers",
        "business intelligence developer", "data analyst", "devops", "devops engineer",
        "senior devops engineer", "machine learning engineer",".net",
        "senior machine learning engineer", "ml engineer", "ios developer", "senior ios developer","mobile app publisher","ios engineer","ios engineers",
        "junior ios developer", "swift mobile app developer", "mobile app developer",
        "app developer", "mobile developer", "android developer", "kotlin developer",
        "flutter developer", "junior flutter developer", "react native developer",
        "react native engineer", "expo developer", "frontend engineer","python developer","java developer",
        "front-end engineer", "front end engineer", "associate frontend engineer",
        "associate front-end engineer", "shopify developer", "network engineer", 
        "entry level network engineer", "cloud engineer", "cloud engineer (azure)", 
        "azure cloud engineer", "ai prompt engineer", "junior ai developer", "prompt engineer", 
        "qa engineer", "automation testing engineer", "test automation developer", 
        "software engineer intern", "intern software engineer", "front end web designer",
        "software engineer fellow", "linux engineer", "ai developer", "ai engineer", "ai specialist",
        "ai expert", "ai analyst", "ai consultant", "ai trainer", "ai mentor", "ai tutor",
        "ai guide", "ai coach", "artificial intelligence","technical developer","odoo","QA Automation","DevSecOps","MLOps",
        # --- Missing Industry Titles (Crucial Additions) ---
        "cybersecurity engineer", "security engineer", "blockchain developer", "game developer",
        "unity developer", "unreal engine developer", "site reliability engineer", "sre",
        "systems architect", "software architect", "cloud architect", "data architect",
        "cybersecurity", "cyber", "power bi developer", "business intelligence analyst",
        "data analysts", "dashboard expert", "dashboard experts","mobile development","app development","mobile app development",
        "mobile developer","app developer","app developers","developer","developers",
        "Cloud", "AWS", "Azure", "Cloud Architect", "Infrastructure Engineer","QA Automation Engineer","QA Automation Engineers","Software Tester","Software Testers","Software Testing","Software Testing Engineer",
        "it and digital","it & digital","data migration","AWS cloud","AWS cloud engineer",
        "AWS cloud specialists","AWS cloud specialists","AWS cloud engineers","AWS cloud engineers","AWS cloud technicians",
        "AWS cloud technicians","AWS cloud support","AWS cloud support engineers","AWS cloud support engineers","AWS cloud support technicians",
        "AWS cloud support technicians",
        "Software Testing Engineers","Software Testing Specialist","Software Testing Specialists",
        
        # --- Heavy Frameworks & Unique Ecosystem Locks ---
        "mern stack", "next.js", "express.js", "react.js", "node.js", "django", "flask", 
        "rasa", "keras", "scikit-learn", "tensorflow", "swiftui", "ansible playbooks",
        "automated testing framework", "prompt frameworks","Security Operation","Security Operation Centre (SOC) Manager","web executive","web executives",
        "QA automation","QA automation engineer","QA automation specialist","QA automation tester","QA automation developer","QA automation analyst","QA automation consultant","QA automation trainer","QA automation mentor","QA automation tutor","QA automation guide","QA automation coach",
    ],
    "weight_2": [
        # --- Core Degrees & Academic Domains ---
        "computer science", "bachelor of computer science", "masters in computer science", 
        "bachelor of science in computer science", "software engineering", "b. tech in computer science",
        "bachelor of science in computer engineering","algorithm","algorithms",
        
        # --- Advanced Domain Specializations ---
        "prompt engineering", "natural language processing", "natural language understanding",
        "software testing life cycle", "stlc", "defect life cycle", "bug life cycle",
        "deep learning", "artificial neural network", "nlp", "intent detection", 
        "native mobile development", "ios performance optimization", "cloud computing", 
        "configuration management", "continuous integration", "network infrastructure solutions", 
        "network security protocols", "cyber threats", "data analysis", "data warehousing",
        "exploratory data analysis", "data quality management", "database architecture",
        "IT Specialist", "IT Support", "Helpdesk", "Desktop Support",
        
        # --- Cloud & Container Ecosystem Infrastructure ---
        "microsoft azure", "azure active directory", "azure ad users", "azure portal",
        "azure role based access control", "azure rbac", "azure virtual machines",
        "azure resource manager template", "azure load balancer", "azure storage accounts",
        "recovery services vault", "azure recovery services", "azure log analytics",
        "aws ec2", "aws ecs", "virtual network peering", "blob storage", "iaas support",
        "terraform", "ansible", "puppet", "vmware vsphere", "docker", "kubernetes", 
        "kubernetes jobs", "jenkins pipelines", "ci/cd pipeline",
        
        # --- Heavy Test Automation Infrastructure ---
        "selenium webdriver", "testng", "testng framework", "hybrid framework", "appium", "pom",
        
        # --- Missing Modern Tech Backbones (Crucial Additions) ---
        "microservices", "graphql", "restful apis", "rest api", "docker compose", 
        "apache kafka", "rabbitmq", "penetration testing", "smart contracts",
        "flutter", "dart", "react native", "expo", "power bi",
        "powerbi", "dashboard", "bi dashboard", "business intelligence",
        "web development", "website development", "wordpress development", ".net development",
        "dotnet development", "data engineering", "business intelligence reporting"
    ],
    "weight_1": [
        # --- Languages & Base Data Dialects ---
        "python", "javascript", "php", "java", "c++", "c#", "ruby", "golang", "rust", "typescript",
        "sql", "mysql", "sqlite", "mongodb", "mongo db", "postgresql", "elasticsearch", "firebase",
        "rds databases", "s3 buckets", "cloudfront cdn", "html/css", "html", "css",
        ".net core", ".net framework", "asp.net", "vue.js", "angular", "wordpress",
        "woocommerce", "laravel", "codeigniter","engineer","project manager","engineers",
        
        # --- Core Engineering Paradigms & Concepts ---
        "data structures and algorithms", "testing and debugging", "database and sql",
        "algorithms", "data structures", "oop", "object oriented programming", "crud app",
        "software development life cycle", "sdlc", "agile methodologies", "agile & scrum", 
        "scrum", "sprint execution", "unit testing", "manual testing", "automation testing", 
        "data driven testing", "apache poi", "smoke testing", "sanity testing", "functional testing", 
        "end-to-end application testing", "adhoc testing", "acceptance testing", "performance testing", 
        "database testing", "test cases", "boundary value analysis", "equivalence class partitioning",
        
        # --- Baseline Tools & Shared Professional Items ---
        "git", "github", "bitbucket", "jira", "postman", "postman client", "thunder client",
        "visual studio code", "vs code", "intellij idea", "jupyter notebook", "google collab", 
        "bug-tracking databases", "excel", "data management", "data collection", "data wrangling", 
        "data mining", "trend spotting", "reporting environment", "metadata", "ticketing system",
        "troubleshooting", "network performance", "apis", "web apps", "coding bootcamp",
        "shopify", "liquid", "shopify liquid", "e-commerce development",
        "ecommerce development", "online store development",
        
        # --- Overlapping / Soft AI Tech Contexts ---
        "prompt design techniques", "ai model testing", "prompt optimization", "algorithm basics",
        "ai ethics fundamentals", "ai fundamentals certificate", "natural language processing certificate",
        
        # --- Ambiguous Cross-Over Roles (Keep as Weight 1) ---
        "system analyst", "system administrator", "sysadmin", "release manager", 
        "it support specialist", "it project manager", "project coordination", 
        "technical application documents"
    ]
})


#It and hardware
add_field_rules("it hardware & networking", {
    "weight_3": [
        # --- Core Infrastructure & Hardware Engineering Titles ---
        "network engineer", "it network engineer", "network administrator", "hardware engineer", 
        "telecommunications engineer", "telecom engineer", "network architect", "infrastructure engineer", 
        "noc technician", "network operations center technician", "hardware technician", 
        "field service technician", "storage engineer", "san administrator", "it technician",
        "network technician", "computer hardware technician", "cctv technician",
        "systems engineer", "data center technician", "data center engineer", "rf engineer","Systems Infrastructure", "Network Administrator", 
        "Server Admin", 
        "IT Infrastructure", "Hardware Engineer","hardware","networking",
        
        # --- Dedicated Operating System, Security & Admin Roles ---
        "systems administrator", "system administrator", "sysadmin", 
        "linux administrator", "windows server administrator", "active directory administrator",
        "access control specialist", "information technology technician", "radio optimization",
        "it officer", "it assistant", "technical support officer",
    ],
    "weight_2": [
        # --- Support Operations & Technical Certifications ---
        "desktop support engineer", "it support technician", "helpdesk technician", 
        "it support specialist", "it coordinator", "technical support engineer",
        "ccna", "ccnp", "ccie", "comptia network+", "comptia a+", "comptia security+", "comptia linux+",
        "jncis", "jncip", "mcitp", "vcp",
        
        # --- Core Infrastructure Virtualization & Routing Architectures ---
        "vmware vsphere", "esxi", "hyper-v", "proxmox", "citrix xen", "virtualization engineer",
        "mesh topology", "private virtual connections", "pvcs", "access control systems",
        "access control list", "networking infrastructure", "mpls", "bgp", "ospf", "eigrp",
        "vlan tagging", "subnetting", "load balancing",
        
        # --- Cellular Infrastructure & Telecommunications Core ---
        "gsm", "umts", "lte", "radio division", "bts", "bbu", "rru", "network optimization", 
        "coaxial cables", "optical fibers", "telecommunication systems", "5g", "volte"
    ],
    "weight_1": [
        # --- Hardware Protocols & Routing Terms ---
        "lan", "wan", "wlan", "man", "tcp/ip", "dns", "dhcp", "active directory", "firewall", 
        "router", "routers", "switch", "switches", "vpn", "voip", "wireshark", "patch panel", "cabling",
        "sip", "icmp", "snmp", "ftp", "sftp", "ssh", "nat", "pat", "ethernet", "fiber optic",
        
        # --- Shared Foundational Operations & Telecom Field Metrics ---
        "troubleshooting", "server maintenance", "helpdesk support", "ticketing system", 
        "hardware replacement", "disaster recovery", "disaster recovery services", "backup management", 
        "hardware inventory", "windows server", "linux", "ubuntu", "redhat", "centos", "technical support",
        "nsn", "huawei", "zte", "azimuth", "tilt", "kpi", "arduino", "proteus", "matlab",
        "rack mounting", "ups", "pdu", "cat6", "nas", "san", "raid", "iscsi",
       
    ]
})


#Accounting and finance
add_field_rules("accounting & finance", {
    "weight_3": [
        # --- Professional Roles & Certifications ---
        "cpa", "certified public accountant", "chartered accountant", "accountant","accounts","accounting","finance","account",
        "junior accountant", "senior accountant", "accounts executive", "accounts officer",
        "accounts assistant", "accounting assistant", "finance officer", "finance assistant",
        "audit executive", "audit officer", "financial analyst",
        "staff accountant", "financial controller", "internal auditor",
        "tax accountant", "bookkeeper", "investment analyst", "cfa", "certified financial analyst",
        "junior financial analyst", "finance executive", "indirect tax senior analyst", 
        "account payable team lead", "accounting close process", "statutory reporting", "tax accounting",
        "comptroller", "finance manager", "accounting manager", "director of finance", "cfo",
        "chief financial officer", "treasury analyst", "portfolio manager", "external auditor",
        "tax consultant", "tax advisor", "forensic accountant", "credit analyst"
    ],
    "weight_2": [
        # --- Core Domains, Regulations & Software Systems ---
        "financial modeling", "financial reporting", "auditing", "tax preparation", 
        "corporate finance", "sap fico", "quickbooks", "xero", "gaap", "ifrs",
        "accounts payable", "accounts receivable", "general ledger", "reconciliation",
        "variance analysis", "budgeting and forecasting", "tax compliance", "tally",
        
        # --- Enterprise Corporate Finance & Tax Frameworks ---
        "fixed asset management", "revenue recognition", "accruals", "deferrals", "financial close", 
        "statutory-basis", "fp&a", "iris", "rbc", "sec requirements", "intercompany transactions", 
        "consolidations", "foreign exchange", "financial forecasting", "procure to pay", "p2p", 
        "vat", "snp rbni", "cfr flux analysis", "sox compliance", "sarbanes-oxley",
        
        # --- Advanced Cash Flows, Enterprise ERPs & Risk (New Additions) ---
        "order to cash", "o2c", "treasury management", "wealth management", "credit control",
        "liquidity management", "netsuite", "peoplesoft", "hyperion", "blackline", "workday finance",
        "transfer pricing", "aml compliance", "anti-money laundering", "kyc verification"
    ],
    "weight_1": [
        # --- Foundational Financial Terms, Systems & Banking Modules ---
        "excel", "bookkeeping", "invoicing", "payroll", "balance sheet", "cash flow", 
        "profit and loss", "p&l", "financial statements", "data analysis", "billing", 
        "cost reduction", "audits", "forecasting", "ledger", "invoice processing",
        "journal entries", "cash flow projections", "budgets", "casa business", "fixed deposit", 
        "gst implementation", "oracle egl", "finacle", "sap", "microsoft dynamics axapta system", 
        "pwc audit", "tax returns", "tax mitigation strategies", "sales & use tax returns", 
        "property tax preparation", "income tax preparation", "compilation and reviews",
        "debt recovery", "petty cash", "depreciation", "amortization", "working capital",
        "bloomberg terminal", "factset", "concur", "ariba", "basel iii", "corporate governance"
    ]
})



#banking 
add_field_rules("banking & financial services", {
    "weight_3": [
        # --- Core Banking & Financial Services Roles ---
        "bank officer", "banking assistant", "banking executive", "relationship officer",
        "relationship manager", "branch manager", "assistant branch manager", "customer service officer (banking)",
        "teller", "cashier", "personal banker", "retail banking officer", "corporate banking officer",
        "commercial banking officer", "investment banking analyst", "investment banker", "treasury officer",
        "treasury analyst", "credit officer", "credit analyst", "loan officer", "loan processing officer",
        "mortgage advisor", "recovery officer", "collections officer", "trade finance officer","cost controller",
        "trade finance executive", "foreign exchange dealer", "forex dealer", "foreign exchange officer",
        "wealth management advisor", "private banker", "priority banking officer", "bancassurance officer",
        "financial advisor", "financial consultant", "financial planner", "investment advisor",
        "portfolio analyst", "portfolio manager", "equity research analyst", "risk analyst",
        "risk management officer", "credit risk analyst", "market risk analyst", "operational risk analyst",
        "compliance officer", "compliance analyst", "regulatory reporting officer", "financial operations executive",
        "securities analyst", "asset management executive", "fund accountant", "fund manager",
        "financial controller", "corporate finance analyst", "mergers and acquisitions analyst", "m&a analyst",
        "financial reporting analyst", "insurance advisor", "insurance executive", "insurance underwriter",
        "claims officer", "claims analyst", "actuarial analyst", "actuary", "risk consultant",
        "insurance relationship manager", "fintech analyst", "digital banking specialist", 
        "payment operations executive", "fraud analyst", "aml analyst", "kyc analyst",
        "financial crime analyst", "transaction monitoring analyst", "aml officer", "anti-money laundering officer",
        "aml compliance analyst", "kyc officer", "know your customer officer", "due diligence analyst",
        "internal control officer", "reconciliation analyst", "settlement officer", "custody operations officer",
        "securities operations analyst", "vp, private banking officer", "private banking officer",
        "business banking officer", "commercial banking officer", "microfinance officer",
        "leasing officer", "pawning officer", "gold loan officer","Pawning", "Gold Loan", "Financial Services", "Credit Associate", "Banking",
    ],
    "weight_2": [
        # --- Supporting Operations, Systems, Protocols & Domains ---
        "retail banking", "commercial banking", "investment banking", "trade finance", "credit analysis",
        "loan processing", "mortgage lending", "debt collection", "debt recovery", "portfolio assessment",
        "equity research", "risk assessment", "credit risk", "market risk", "operational risk",
        "regulatory compliance", "regulatory reporting", "fund accounting", "securities operations",
        "asset management", "wealth management", "actuarial modeling", "claims processing", "underwriting",
        "payment operations", "fraud detection", "transaction monitoring", "anti-money laundering", "aml",
        "know your customer", "kyc", "customer due diligence", "cdd", "enhanced due diligence", "edd",
        "financial crime investigation", "account reconciliation", "clearing and settlement", "custody operations",
        "bancassurance", "foreign exchange", "forex", "fx operations", "letter of credit", "bank guarantees",
        "casa business", "fixed deposits", "treasury management","Relationship Executive",
        
        # --- Real-World Executive Banking Workflows ---
        "business banking", "lending relationships", "deposit relationships", "loan portfolio", 
        "credit quality", "sales strategy", "outside sales", "cash management", "credit policy", 
        "loan application packages", "vault management", "sales referrals", "transaction processing", 
        "new account sales", "consumer loans", "loan payments"
    ],
    "weight_1": [
        # --- Foundational Tools, Core Skills & Soft Skills ---
        "financial analysis", "customer service", "cash handling", "client relationship management", "crm",
        "cross selling", "upselling", "risk mitigation", "due diligence", "internal controls",
        "reconciliation", "data entry", "documentation", "finacle", "flexcube", "t24", "swift network", 
        "bloomberg", "reuters", "ms excel", "spreadsheets", "change orders", "drive-thru banking", 
        "lobby operations", "cross-selling", "wires", "referral generation"
    ]
})


#sales and marketing
add_field_rules("sales & marketing", {
    "weight_3": [
        # --- Sales Roles ---
        "sales executive", "senior sales executive", "sales representative", "sales officer","sales & marketing","showroom manager",
        "showroom executive","showroom officer","showroom assistant","showroom technician","showroom coordinator",
        "showroom executive","showroom officer","showroom assistant","showroom technician","showroom coordinator",
        "sales & marketing consultant", "sales and marketing consultant","social media",
        "sales & marketing executive", "sales and marketing executive",
        "sales & marketing officer", "sales and marketing officer","market",
        "student consultant sales marketing", "sales technician", "sales and technician",
        "sales associate", "sales consultant", "sales coordinator", "sales administrator",
        "sales assistant", "territory sales executive", "territory manager", "area sales manager",
        "regional sales manager", "national sales manager", "sales manager", "senior sales manager",
        "business development executive", "business development officer", "business development associate",
        "business development manager", "account executive", "account manager", "key account executive",
        "key account manager", "client relationship executive", "relationship manager", "corporate sales executive",
        "corporate sales manager", "inside sales representative", "outside sales representative", "direct sales executive",
        "field sales executive", "retail sales executive", "channel sales executive", "channel sales manager",
        "distributor sales executive", "dealer sales executive", "trade marketing executive", "fmcg sales executive",
        "medical sales representative", "pharmaceutical sales representative", "real estate sales executive",
        "telemarketing executive", "telesales executive", "customer acquisition executive", "revenue officer", "revenue manager",
        "product","category","category manager","relationship executive","channel operations",
        
        # --- Marketing & Digital Roles ---
        "marketing executive", "senior marketing executive", "marketing officer", "marketing coordinator",
        "marketing assistant", "marketing specialist", "marketing manager", "brand executive",
        "brand manager", "product marketing executive", "product marketing manager", "product manager",
        "assistant product manager", "market research executive", "market research analyst", "consumer insights analyst",
        "marketing analyst", "trade marketing manager", "campaign executive", "campaign manager",
        "event marketing executive", "event marketing manager", "promotions executive", "public relations executive",
        "public relations officer", "public relations manager", "communications executive", "corporate communications manager",
        "digital marketing executive", "digital marketing specialist", "digital marketing manager", "social media executive",
        "social media specialist", "social media manager", "social media coordinator", "content marketing executive",
        "content marketing specialist", "content marketing manager", "seo executive", "seo specialist",
        "seo analyst", "seo manager", "sem specialist", "ppc specialist", "google ads specialist",
        "paid media specialist", "performance marketing executive", "performance marketing specialist", "performance marketing manager",
        "search engine marketing specialist", "email marketing executive", "email marketing specialist", "affiliate marketing executive",
        "affiliate marketing manager", "influencer marketing executive", "influencer marketing manager", "growth marketing specialist",
        "growth marketing manager", "marketing automation specialist", "crm marketing specialist", "crm executive",
        "crm manager", "e-commerce marketing executive", "e-commerce specialist", "e-commerce manager", "online marketing specialist",
        
        # --- Advertising, Strategy, Leadership & Specialized Roles ---
        "advertising executive", "advertising manager", "media planner", "media buyer",
        "media executive", "creative strategist", "copywriter", "content writer",
        "content strategist", "brand strategist", "marketing communications specialist", "integrated marketing specialist",
        "marketing data analyst", "business development analyst", "sales analyst", "revenue analyst",
        "pricing analyst", "market intelligence analyst", "demand generation specialist", "lead generation specialist",
        "sales operations analyst", "marketing operations specialist", "head of sales", "head of marketing",
        "director of sales", "director of marketing", "chief marketing officer", "cmo",
        "vice president of sales", "vice president of marketing", "chief revenue officer", "cro",
        "marketing manager & specialist", "social media admin", "seo specialist / paid search", 
        "digital marketing consultant", "digital strategist", "internet marketer","Merchandiser","Merchandisers","Merchandising",
        
        # --- Industry Additions ---
        "abm specialist", "account-based marketing manager", "sales enablement manager", "growth hacker",
        "product led growth specialist", "plg strategist", "customer success manager", "csm"
    ],
    "weight_2": [
        # --- Core Domains, Functional Methodologies & Strategy ---
        "sales & marketing", "sales and marketing", "sales marketing", "technical sales",
        "sales support", "business development", "digital marketing", "social media marketing", "content marketing",
        "search engine optimization", "seo", "search engine marketing", "sem", "pay-per-click", "ppc",
        "performance marketing", "growth marketing", "email marketing", "affiliate marketing",
        "influencer marketing", "brand management", "product marketing", "market research",
        "public relations", "pr", "corporate communications", "media planning", "media buying",
        "demand generation", "lead generation", "sales operations", "marketing operations",
        "b2b sales", "b2c sales", "corporate sales", "enterprise sales", "channel sales",
        "inside sales", "outside sales", "field sales", "telesales", "telemarketing",
        "account management", "key account management", "territory management", "trade marketing",
        "campaign management", "event marketing", "e-commerce marketing", "advertising strategy",
        "copywriting", "content strategy", "brand strategy", "pricing strategy", "competitive analysis",
        "marketing budget", "competitor strategies", "social media management", "content creation", 
        "digital marketing strategy", "seo & analytics", "content planning",
        
        # --- Specialized Optimization & Web Traffic Mechanics ---
        "off-page optimization", "on-page optimization", "link building", "ppc advertising", 
        "internet marketing", "webinar promotion", "subscriber signups", "conversions tuning", 
        "user engagement optimization",
        
        # --- Strategic B2B & Growth Frameworks (New Additions) ---
        "account-based marketing", "abm", "sales enablement", "product-led growth", "plg",
        "omnichannel marketing", "retargeting campaigns", "remarketing strategy", "inbound marketing",
        "outbound marketing", "funnel metrics analysis", "customer lifetime value tracking"
    ],
    "weight_1": [
        # --- Tactical Metrics, Frameworks & Tech Stack Ecosystems ---
        "sales", "marketing", "sales pipeline", "crm", "customer relationship management", "salesforce", "hubspot",
        "google analytics", "google ads", "facebook ads", "meta ads", "linkedin ads",
        "marketing automation", "mailchimp", "marketo", "sales closings", "cold calling",
        "lead nurturing", "conversion rate optimization", "cro metrics", "customer acquisition cost", "cac",
        "lifetime value", "ltv", "return on ad spend", "roas", "click-through rate", "ctr",
        "key performance indicators", "kpis", "market segmentation", "consumer insights", "brand awareness",
        "sales forecasting", "quota attainment", "negotiation", "client onboarding", "customer retention",
        "funnel optimization", "a/b testing", "data analysis", "roi optimization", "brand consistency", 
        "campaign performance", "audience interaction", "content posting", "digital tools",
        
        # --- Social Management Platforms, Extra Networks & Certs ---
        "instagram growth", "sprout social", "hootsuite", "pinterest marketing", "tiktok marketing", 
        "google adwords certification", "google analytics individual qualification", "web analytics",
        
        # --- MarTech & AdTech Tools (New Additions) ---
        "semrush", "ahrefs", "google search console", "gsc", "hotjar", "optimizely", "klaviyo", 
        "pardot", "buffer", "canva", "google tag manager", "gtm", "looker studio"
    ]
})

#HR and recruitment
add_field_rules("human resources", {
    "weight_3": [
        # --- Dedicated Recruitment & TA Roles ---
        "hr executive", "senior hr executive", "hr officer", "hr assistant", "human resources","human resources & adminisitratiion",
        "hr administrator", "recruitment executive", "recruitment officer", 
        "talent acquisition executive", "talent acquisition specialist", "talent acquisition partner",
        "talent acquisition manager", "technical recruiter", "it recruiter", "corporate recruiter",
        "staffing specialist", "sourcing specialist", "recruitment consultant", "executive search consultant",
        "headhunter", "recruitment advisor", "talent acquisition consultant",
        "talent acquisition","learning and development","learning & development",
        # --- General HR Leadership & Generalist Roles ---
        "human resources executive", "human resources officer", "human resources assistant",
        "human resource assistant", "assistant manager human resources", "assistant manager hr",
        "human resources specialist",
        "human resources generalist", "human resources business partner", "hrbp", "human resources manager",
        "senior human resources manager", "head of human resources", "hr director", "chief human resources officer",
        "chro", "hr team lead", "hr manager", "senior hr manager", "head of people operations",
        "human capital manager", "people operations manager", "people partner", "group human resources team lead",
        "junior executive – human resources", "junior executive human resources",
        "hr & admin assistant", "hr trainee", "human resources trainee",
        
        # --- Employee Relations & L&D Specialists ---
        "employee relations executive", "employee relations specialist", "employee relations manager",
        "employee engagement executive", "employee engagement specialist", "employee experience manager",
        "culture and engagement specialist", "workplace relations officer",
        "learning and development executive", "learning and development specialist", "learning and development manager",
        "training executive", "training officer", "training specialist", "training manager", "corporate trainer", 
        "instructional designer", "organizational development specialist", "organizational development manager",
        
        # --- Comp, Benefits, Payroll & Performance ---
        "compensation and benefits executive", "compensation and benefits specialist", "compensation analyst",
        "rewards specialist", "total rewards manager", "benefits administrator", "payroll executive",
        "payroll officer", "payroll administrator", "payroll specialist", "payroll manager", "payroll supervisor",
        "performance management executive", "performance management specialist", "talent management specialist",
        "talent development manager", "succession planning specialist", "hr operations executive",
        "hr operations specialist", "hr operations manager", "hr shared services specialist",
        "hr analyst", "hr data analyst", "hris analyst", "hris specialist", "hr systems administrator"
    ],
    "weight_2": [
        # --- Core HR Operations & Compliance Frameworks ---
        "talent acquisition", "recruitment", "headhunting", "employer branding", "employee relations",
        "employee engagement", "learning and development", "l&d", "training and development",
        "organizational development", "compensation and benefits", "total rewards", "payroll processing",
        "performance management", "talent management", "succession planning", "hr operations",
        "hr shared services", "industrial relations", "labor relations", "hr compliance",
        "diversity equity and inclusion", "dei", "workforce planning", "onboarding", "offboarding",
        "performance appraisal", "job evaluation", "salary benchmarking", "employee lifecycle",
        "manpower planning", "policy briefings", "final settlements", "smeta audits", "gots audits", 
        "labor department matters", "labor tribunal cases", "outbound training", "obt", 
        "policy standardization", "competency-based development", "strategic training analysis", 
        "background checks", "drug screens", "sex offender registry search", "payroll tax calculation", 
        "end of financial year reconciliations", "awards interpretation", "succession mapping", 
        "competency mapping", "performance calibration", "change management", "workplace investigations", 
        "collective bargaining", "union relations", "bsci audits", "iso 9001 compliance", 
        "manpower budgeting", "executive tracking", "probation management"
    ],
    "weight_1": [
        # --- Fluid/Cross-Functional Coordinator Roles in HR ---
        "recruitment coordinator", "training coordinator", "staffing coordinator", "hr coordinator",
        "project coordinator", "operations coordinator",

        # --- Systems, Tools & Metrics Ecosystem ---
        "hris", "human resources information systems", "applicant tracking system", "ats",
        "workday", "bamboohr", "successfactors", "peoplesoft hr", "taleo", "linkedin recruiter",
        "labor law", "shop and office employees act", "employment contracts", "grievance handling",
        "disciplinary inquiries", "hr analytics", "turnover rate", "time to hire", "cost per hire",
        "employee satisfaction", "esat", "training needs analysis", "tna", "attendance tracking",
        "leave management", "statutory deductions", "epf", "etf", "gratuity", "payroll administration",
        "hsenid", "dms payroll", "mihcm", "perfect people", "stratitec timeips", "adp workforce now", 
        "cqhrm", "slipat", "iptad", "turnover reduction", "time card processing", "superannuation clearing house",
        "okrs", "kpis", "key performance indicators", "360 feedback", "exit interviews", 
        "payroll summaries", "timesheet calculation", "shrm-cp", "phr", "sphr", "cipm", "slitad",
        "paychex", "kronos", "gusto", "greenhouse", "lever", "zoho recruit"
    ]
})

#administration and 
add_field_rules("administration & secretarial", {
    "weight_3": [
        # --- Core Administrative & Support Roles ---
        "administrative assistant", "administration executive", "administrative officer","data entry"
        "admin executive", "admin officer", "admin assistant", "administration officer",
        "senior administrative officer", "office administrator", "office assistant", 
        "office executive", "office manager", "senior office manager","data processing","clerk",
        "junior executive – administration", "executive – administration", "admin clerk", "general clerk","CCTV",
        
        # --- Secretarial & Personal Support Roles ---
        "secretary", "executive secretary", "personal secretary", "personal assistant", "pa",
        "executive assistant", "ea", "senior executive assistant", "administrative secretary", "office secretary",
        
        # --- Front Office & Reception Roles ---
        "receptionist", "front desk executive", "front office executive", "front office assistant",
        "guest relations officer", "telephone operator", "call operator",
        
        # --- Document, Records & Dedicated Support Roles ---
        "data entry operator", "data entry clerk", "document controller", "documentation executive",
        "filing clerk", "records assistant", "records officer", "office assistant (back office)",
        "back office executive", "mis executive", "office support executive", "business support executive", 
        "operations assistant", "admin support officer", "document management executive", 
        "records management officer", "documentation officer", "filing & records clerk", 
        "compliance documentation assistant", "collections clerk",
        
        # --- Senior & Executive Management Roles ---
        "administration manager", "senior administration manager", "head of administration",
        "chief administrative officer", "office operations manager", "corporate services manager","computer operator","computer operators",
    ],
    "weight_2": [
        # --- Core Functional Methodologies & Management Systems ---
        "office administration", "records management", "document control", "calendar management",
        "travel coordination", "diary management", "meeting minutes", "agenda preparation",
        "front office management", "visitor management", "switchboard operations", "call routing",
        "mail handling", "courier management", "petty cash management", "office procurement",
        "inventory control", "facilities management", "vendor coordination", "mis reporting",
        "back office operations", "data verification", "database maintenance", "regulatory archiving",
        "compliance documentation", "secretarial practices", "executive support", "event coordination",
        "account maintenance", "accounting support", "supply inventory management", "custody of cash items", 
        "contractual obligations tracking", "civilian pay data", "discrepancy resolution", "filing system implementation"
    ],
    "weight_1": [
        # --- Cross-Functional Coordinators Demoted to Weight 1 ---
        "administrative coordinator", "office coordinator", "project coordinator", 
        "scheduling coordinator", "appointment coordinator", "logistics coordinator", 
        "operations coordinator",

        # --- Productivity Tools & Office Mechanics ---
        "ms office", "microsoft excel", "microsoft word", "microsoft powerpoint", "ms outlook",
        "google workspace", "google calendar", "google docs", "google sheets", "data entry",
        "typing speed", "alphabetic filing", "numeric filing", "shorthand", "dictation",
        "scanning", "photocopying", "invoice verification", "billing support", "expense tracking",
        "customer service", "interpersonal communication", "multi-line phone systems", "crm systems",
        "adobe acrobat", "pdf management", "task prioritization", "office automation",
        "magview", "epic software systems", "quickbooks admin", "a/p", "a/r", "meeting efficiency tracking"
    ]
})


#engineering
add_field_rules("engineering & construction", {
    "weight_3": [
        # --- Civil & Structural Design Roles ---
        "civil engineer","civil engineers", "senior civil engineer", "site engineer", "site supervisor","electrical","mechanical","civil","civil engineering",
        "civil engineering & construction","civil engineering & construction manager","civil engineering & construction supervisor",
        "civil engineering & construction engineer","civil engineering & construction technician",
        "civil engineering & construction assistant","civil engineering & construction officer","engineer","engineers",
        "civil engineering & construction manager","civil engineering & construction supervisor","civil engineering & construction engineer",
        "civil engineering & construction technician","civil engineering & construction assistant","civil engineering & construction officer",
        "site manager", "construction engineer", "structural engineer", "structural design engineer",
        "infrastructure engineer", "highway engineer", "bridge engineer", "water resources engineer",
        "geotechnical engineer", "structural draftsman", "cad engineer", "autocad designer",
        "revit technician", "draftsman / drafter", "draftsman", "drafter", "3d modeler","draughtsman","MEP draughtsman","design engineer (electrical elv)","elv engineer","mep engineer",
        "Design Engineer (Electrical ELV)","MEP","project engineer","electronics","electronics engineer","electronics engineers",
        
        # --- Construction Management & Leadership Roles ---
        "construction manager", "project manager", "senior project manager", "construction coordinator",
        "site engineering","site engineers",
        "construction supervisor", "general foreman", "site foreman", "construction superintendent", 
        "contracts manager", "construction planner", "head of engineering", "engineering manager", 
        "senior engineering manager", "chief engineer", "technical director", "director of construction",
        
        # --- Quantity Surveying & Cost Estimation Roles ---
        "quantity surveyor","quantity surveyors" "qs", "senior quantity surveyor", "assistant quantity surveyor",
        "cost engineer", "cost estimator", "estimation engineer", "procurement engineer",
        "billing engineer",
        
        # --- MEP, Systems & R&D Engineering Roles ---
        "electrical engineer", "senior electrical engineer", "electrical design engineer", "electrical site engineer",
        "power systems engineer", "electrical maintenance engineer", "mep electrical engineer", "control systems engineer",
        "mechanical engineer", "senior mechanical engineer", "mechanical design engineer", "mechanical site engineer",
        "maintenance engineer", "hvac engineer", "piping engineer", "production engineer", "industrial engineer",
        "mep engineer", "senior mep engineer", "mep coordinator", "mep design engineer", "mep site engineer",
        "hvac design engineer", "plumbing engineer", "fire protection engineer", "research and development engineer", 
        "r&d engineer","electrical | mechanical","electrical|mechanical"
        
        # --- Industrial, Specialized & Support Technical Roles ---
        "plant engineer", "factory engineer", "maintenance supervisor", "equipment engineer",
        "environmental engineer", "safety engineer", "hse engineer", "hse officer", "safety officer",
        "safety executive", "health and safety executive", "health & safety executive",
        "occupational health & safety officer",
        "quality control engineer", "qc engineer", "quality assurance engineer", "qa engineer",
        "materials engineer", "surveyor", "land surveyor", "engineering assistant", "technical officer",
        "site technician", "machine operator", "survey assistant", "lab technician", "bim engineer",
        "electrical technician", "mechanical technician","(Mechanical | Electrical | Mechatronics)",
    ],
    "weight_2": [
        # --- Core Construction Workflows, Engineering Principles & Design Mechanics ---
        "civil engineering principles", "structural design", "site supervision", "quantity surveying",
        "project management", "estimation & boq", "bill of quantities", "boq preparation",
        "bim modeling", "building information modeling", "mep coordination", "hvac design",
        "concrete technology", "foundation engineering", "reinforced concrete", "steel structures",
        "highway engineering design", "geotechnical investigation", "land surveying methods",
        "project scheduling", "construction planning", "contract management", "variation orders",
        "tender preparation", "rate analysis", "quality assurance", "quality control",
        "material testing", "site inspection", "health and safety compliance", "hse management",
        "fire fighting system design", "plumbing system design", "piping networks", "preventive maintenance",
        "advanced materials development", "manufacturing process optimization", "infrastructure design", 
        "transportation infrastructure", "technical plans"
    ],
    "weight_1": [
        # --- Cross-Functional Roles Shifted to Low Weight to Prevent False Matches ---
        "project coordinator", "operations coordinator","Lubricant",

        # --- Technical Software, CAD, BIM & GIS Platforms ---
        "autocad", "revit", "staad pro", "etabs", "sap2000", "primavera p6", "ms project",
        "navisworks", "sketchup", "solidworks", "catia", "matlab", "civil 3d", "gis software",
        
        # --- Specialized Field Instruments ---
        "total station", "theodolite", "leveling instrument", "gps surveying",
        
        # --- Global Quality, Safety, Environmental Standards & Agile Frameworks ---
        "osha standards", "iso 14001", "iso 9001", "iso 45001", "leed certification", "scrum",
        
        # --- Legal Contracts, Measuring Standards & Building Codes ---
        "fidic contracts", "sri lanka standard method of measurement", "slsmm", 
        "civil engineering standard method", "cesmm", "asce codes", "bs codes", "eurocodes",
        
        # --- Engineering Site Workflows, Deliverables & Structural Details ---
        "concrete slump test", "cube testing", "as-built drawings", "shop drawings", 
        "bar bending schedules", "bbs", "system optimization"
    ]
})

#manufacturing
add_field_rules("manufacturing & production", {
    "weight_3": [
        # --- Production & Factory Operations ---
        "production manager", "assistant production manager", "production supervisor","Manufacturing","production","manufacturing & production",
        "production executive", "production officer", "factory manager", "assistant factory manager",
        "factory supervisor", "factory worker", "machine operator", "assembly line worker",
        "shift supervisor", "line leader", "Costing Executive", "Production Planning","packing","Chemist","Culturist","Machine Technician",

        
        # --- Manufacturing & Process Engineering ---
        "manufacturing engineer", "senior manufacturing engineer", "process engineer",
        "industrial engineer", "production engineer", "plant engineer", "maintenance engineer",
        "maintenance supervisor", "equipment engineer", "process improvement engineer",
        "lean manufacturing engineer", "six sigma engineer", "continuous improvement specialist",
        "kaizen officer", "process optimization engineer",
        
        # --- Quality Control & Assurance (Manufacturing Specific) ---
        "quality control inspector", "qc inspector", "quality control engineer", "qc engineer",
        "quality assurance engineer", "qa engineer", "quality assurance officer", "qa officer",
        "quality manager", "senior quality engineer", "quality technician", "quality analyst",
        "process quality engineer","dairy","dairy development",
        
        # --- Production Planning & Control ---
        "production planner", "production planning engineer", "production control officer",
        "production scheduler", "materials planner", "planning engineer", "demand planner",
        "supply planner",
        
        # --- Operations, Maintenance & Technical Support ---
        "operations manager", "operations supervisor", "operations executive", "plant operations manager",
        "manufacturing operations manager", "shift operations manager", "industrial operations engineer",
        "lab technician", "materials technician", "testing technician", "calibration technician",
        "r&d technician", "industrial lab assistant", "maintenance technician", "electrical maintenance technician",
        "mechanical maintenance technician", "machine maintenance supervisor", "equipment maintenance engineer",
        "repair technician", "electrician", "electricians", "mechanic", "mechanics",
        "electrical mechanic", "maintenance mechanic", "industrial electrician",
        "auto mechanic", "vehicle mechanic",
        
        # --- Packaging & Plant-Floor Support ---
        "packaging operator", "packaging supervisor", "warehouse assistant", "inventory controller",
        "material handler","warehouse",
        
        # --- Executive Factory Leadership ---
        "head of production", "head of manufacturing", "manufacturing manager", "plant manager",
        "senior plant manager", "director of manufacturing", "chief operations officer"
    ],
    "weight_2": [
        # --- Core Manufacturing Methodologies & Plant Workflows ---
        "production planning", "machine operation", "quality control", "quality assurance","checkers","checker",
        "qc inspection", "lean manufacturing", "maintenance engineering", "industrial safety",
        "process optimization", "continuous improvement", "kaizen", "six sigma", "5s methodology",
        "root cause analysis", "rca", "corrective and preventive action", "capa", "total productive maintenance",
        "tpm", "overall equipment effectiveness", "oee", "value stream mapping", "vsm",
        "standard operating procedures", "sop creation", "assembly line balancing", "capacity planning",
        "material requirements planning", "mrp", "shop floor management", "inventory control",
        "preventive maintenance", "predictive maintenance", "haccp compliance", "good manufacturing practices",
        "gmp compliance", "statistical process control", "spc", "failure mode and effects analysis", "fmea",
        "electrical maintenance", "mechanical maintenance", "machine repair", "equipment repair","Autonomation","garment","quality checker","quality checkers",
    ],
    "weight_1": [
        # --- Cross-Functional Demoted/Fluid Coordinator Roles ---
        "production coordinator", "logistics coordinator", "operations coordinator", "project coordinator",
        "factory coordinator", "planning coordinator",

        # --- Manufacturing Infrastructure, Equipment, Automation & Tools ---
        "plc", "scada", "hmi", "cnc programming", "computer numerical control", "cad", "cam",
        "sap pp", "oracle mfg", "mes", "manufacturing execution systems", "erp systems",
        "calibration tools", "vernier caliper", "micrometer", "multimeter", "oscilloscope",
        "iso 9001", "iso 14001", "iso 45001", "iso 22000", "osha regulations", "hazmat",
        "bill of materials", "bom", "cycle counting", "just in time", "jit", "kanban systems",
        "poka yoke", "turnover rate", "downtime reduction", "scrap metrics", "yield optimization","industrial engineering","Lubricant",
    ]
})

#supply chain and logistics
add_field_rules("supply chain & logistics", {
    "weight_3": [
        # --- Supply Chain Management & Strategy ---
        "supply chain manager", "assistant supply chain manager", "supply chain executive","supply chain",
        "logistic","supply chain & logistics","supply chain","Stores", "Storekeeper", "Warehouse",
        "logistics","supply chain & logistics","shipping","Fleet",
        "supply chain officer", "supply chain assistant", "supply chain analyst", "supply chain planner",
        "supply chain specialist", "end-to-end supply chain manager", "global supply chain manager","store keeper","store keepers",
        
        # --- Logistics, Transportation & Fleet Management ---
        "logistics manager", "assistant logistics manager", "logistics executive","transport operation","transport operation coordinator",
        "logistics officer", "logistics assistant", "transportation manager",
        "fleet manager", "distribution manager", "shipping executive",
        "freight forwarding executive", "last mile delivery manager", "route planner",
        "delivery manager","export",
        
        # --- Warehouse & Inventory Control ---
        "warehouse manager", "warehouse supervisor", "warehouse executive", "warehouse assistant",
        "warehouse officer", "warehouse coordinator",
        "storekeeper", "store assistant", "inventory controller", "inventory manager",
        "inventory executive", "stock controller", "stock clerk", "materials controller",
        "materials handler",
        
        # --- Import, Export & Trade Compliance ---
        "import manager", "export manager", "import executive", "export executive",
        "trade compliance officer", "customs clearance officer",
        
        # --- Procurement, Purchasing & Sourcing ---
        "procurement manager", "assistant procurement manager", "procurement executive",
        "procurement officer", "purchasing manager", "purchasing officer", "buyer",
        "senior buyer", "strategic sourcing specialist", "vendor manager",
        "supplier relationship manager",
        
        # --- Planning, Demand & Operations ---
        "demand planner", "supply planner", "production planner", "materials planner",
        "inventory planner", "forecasting analyst", "planning manager", "operations planning officer",
        "operations manager", "operations executive", "distribution officer", "dispatch officer",
        "logistics documentation officer", "shipping documentation executive", "customs documentation officer",
        "export documentation executive", "administrative logistics assistant",
        
        # --- Executive Leadership Roles ---
        "head of supply chain", "head of logistics", "head of procurement", "supply chain director",
        "logistics director", "operations director", "chief supply chain officer", "csco"
    ],
    "weight_2": [
        # --- Core Domain Operations & Functional Frameworks ---
        "inventory management", "procurement", "logistics coordination", "freight forwarding",
        "shipping operations", "warehouse operations", "supply chain planning", "import documentation",
        "export documentation", "customs clearance", "strategic sourcing", "vendor management",
        "supplier relationship management", "demand forecasting", "material requirements planning",
        "distribution management", "last mile delivery", "fleet management operations", "incoterms",
        "bill of lading", "bol", "letter of credit", "lc management", "reverse logistics",
        "cold chain logistics", "3pl management", "third party logistics", "4pl", "cross docking",
        "cycle counting", "safety stock optimization", "purchase order management", "po tracking",
        "tender evaluation", "contract negotiation", "landed cost analysis", "customs auditing"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "supply chain coordinator", "logistics coordinator", "transport coordinator", 
        "fleet coordinator", "delivery coordinator", "distribution coordinator", 
        "shipping coordinator", "import/export coordinator", "freight coordinator", 
        "project coordinator", "coordination officer", "operations coordinator",

        # --- Enterprise Software, Tracking Systems & Performance Metrics ---
        "sap mm", "sap sd", "sap wm", "oracle scm", "oracle purchasing", "wms",
        "warehouse management system", "tms", "transportation management system", "erp systems",
        "microsoft excel", "data analytics", "rfid scanning", "barcode systems", "edi",
        "electronic data interchange", "container tracking", "sea freight", "air freight",
        "land freight", "customs tariffs", "hscode", "harmonized system codes", "otif",
        "on time in full", "inventory turnover", "stockout reduction", "lead time optimization",
        "kpis", "key performance indicators", "supply chain cost reduction", "demurrage tracking","industrial engineering",
    ]
})

#Healthcare and medical
add_field_rules("healthcare & medical", {
    "weight_3": [
        # --- Doctor, Clinical & Specialist Roles ---
        "medical doctor", "general physician", "specialist doctor", "consultant physician","health","healthcare","hygiene","sustainability",
        "surgeon", "junior doctor", "medical officer", "house officer", "resident medical officer",
        "registrar", "anesthesiologist", "pediatrician", "gynecologist", "obstetrician",
        "cardiologist", "dermatologist", "psychiatrist", "radiologist", "icu specialist","medical","laboratory","diagnostics",
        "Therapist", "Massage", "Physiotherapist","Microbiologist","microbiology","surgical","Phlebotomist",
        
        # --- Nursing Roles ---
        "registered nurse", "staff nurse", "senior nurse", "nursing officer", "nursing assistant",
        "icu nurse", "theatre nurse", "ot nurse", "community health nurse", "midwife",
        "head nurse", "oncology nurse", "neonatal nurse", "home care nurse","nurse","nurses","doctor","doctors","physician","physicians",
        "nurse","hospital","dental","doctor","physician","doctors","nursing","care giver","care giving","care givers",
        
        # --- Laboratory, Diagnostics & Imaging Roles ---
        "medical laboratory technician", "medical laboratory technologist", "lab technician",
        "senior lab technician", "pathology technician", "microbiology technician",
        "radiology technician", "x-ray technician", "mri technician", "ct scan technician",
        "sonographer", "diagnostic technician", "operation theatre technician", "dialysis technician",
        "Patient",
        
        # --- Pharmacy & Pharmaceutical Roles ---
        "pharmacist", "assistant pharmacist", "clinical pharmacist", "hospital pharmacist",
        "community pharmacist", "pharmacy technician", "pharmaceutical sales representative",
        "drug safety officer", "pharmacy assistant", "dispensary assistant","Clinical support","specialist","specialists","pharmacists",
        
        # --- Allied Health & Therapy Roles ---
        "physiotherapist", "occupational therapist", "speech therapist", "audiologist",
        "nutritionist", "dietitian", "clinical psychologist", "mental health counselor",
        "social worker", "geriatric care specialist", "caregiver","caregivers", "care assistant",
        
        # --- Emergency & Pre-Hospital Care ---
        "paramedic", "emergency medical technician", "emt", "ambulance officer",
        "emergency care assistant", "critical care technician",
        
        # --- Healthcare Administration & Leadership ---
        "hospital administrator", "healthcare administrator", "medical receptionist",
        "medical records officer", "health services manager", "clinic manager",
        "insurance claims officer", "chief medical officer", "cmo", "medical superintendent",
        "hospital director", "director of nursing", "head of department", "clinical director",
        
        # --- Public Health & Medical Research ---
        "public health officer", "epidemiologist", "health inspector", "community health worker",
        "medical research assistant", "research scientist"
    ],
    "weight_2": [
        # --- Core Clinical Operations, Diagnosis & Medical Workflows ---
        "patient care", "medical diagnosis", "clinical procedures", "laboratory testing",
        "pharmacy knowledge", "emergency care", "medical documentation", "patient assessment",
        "vital signs monitoring", "phlebotomy", "infection control", "medication administration",
        "wound care", "bls", "basic life support", "acls", "advanced cardiovascular life support",
        "cpr", "triage", "sterile technique", "specimen collection", "anesthesia support",
        "pharmacovigilance", "clinical trials", "epidemiological surveillance", "health charting",
        "patient education", "icu monitoring", "dialysis care", "rehabilitation exercises","Patient Handling",
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "patient care coordinator", "clinical research coordinator", "project coordinator",
        "operations coordinator", "health coordinator", "clinic coordinator",
        
        # --- Medical Software, Technical Platforms & Clinical Compliance ---
        "his", "hospital information system", "emr", "electronic medical records", "ehr",
        "electronic health records", "epic systems", "cerner", "meditech", "icd-10",
        "icd-9", "cpt coding", "hipaa compliance", "gcp", "good clinical practice",
        "medical billing software", "lis", "laboratory information system", "pacs",
        "picture archiving and communication system", "dicom", "autoclave tracking"
    ]
})

#education
add_field_rules("education & training", {
    "weight_3": [
        # --- K-12 Teaching & Instruction ---
        "teacher", "primary school teacher", "secondary school teacher", "high school teacher","teachers","lecturers",
        "subject teacher", "classroom teacher", "assistant teacher", "preschool teacher","Coach","Coaches","Coaching",
        "early childhood teacher", "montessori teacher", "senior teacher","Counselor","advisor","advisors","tutors",
        "head teacher", "tutor", "private tutor","Study Abroad", "Education Consultant", "Academic Counselor", "Student Advisor","Tutoring",
        "Instructor",
       
        
        # --- Higher Education & Academia ---
        "lecturer", "senior lecturer", "assistant lecturer", "professor", "associate professor",
        "visiting lecturer", "adjunct lecturer", "university instructor", "teaching assistant","deputy lecturer","lecturer","senior lecturer","assistant lecturer","professor","associate professor",
        "Deputy Head","Deputy Head of Department","Deputy Head of Faculty","Deputy Head of School","Deputy Head of Institute","Deputy Head of College","Deputy Head of University","Deputy Head of Academy","Deputy Head of Centre","Deputy Head of Institute",
        "Deputy Head of College","Deputy Head of University","Deputy Head of Academy","Deputy Head of Centre",
        "research assistant","lecturer","senior lecturer","assistant lecturer","professor","associate professor",
        "adjunct lecturer", "university instructor", "teaching assistant","deputy lecturer","lecturer","senior lecturer","assistant lecturer","professor","associate professor",
        "visiting lecturers", "adjunct lecturer", "university instructor", "teaching assistant","deputy lecturer","lecturer","senior lecturer","assistant lecturer","professor","associate professor",
        
        # --- Academic Administration & Leadership ---
        "principal", "vice principal", "academic officer", "education officer", "school administrator",
        "university administrator", "registrar", "admissions officer", "examination officer",
        "dean", "vice chancellor", "chancellor", "head of department", "director of studies",
        "school clerk", "exam invigilator", "exam supervisor",
        "Student Relations", "Student Affairs", "Academic Counselor", "Registrar Office", "Academic Registrar","Counsellor",
        
        # --- Training & Corporate Learning Specialists ---
        "trainer", "corporate trainer", "training officer", "training manager", 
        "learning and development executive", "l&d executive", "learning and development specialist",
        "l&d specialist", "learning and development manager", "l&d manager", "instructional designer",
        "corporate facilitator", "workshop facilitator",
        
        # --- E-Learning & EdTech Specialists ---
        "e-learning developer", "e-learning specialist", "online tutor", "virtual instructor",
        "lms administrator", "educational content developer", "curriculum designer",
        "instructional technologist", "edtech specialist",
        
        # --- Special Education & Support Roles ---
        "special education teacher", "sen teacher", "learning support assistant",
        "behavioral therapist", "speech therapist", "guidance counselor assistant",
        "library assistant", "librarian", "academic support officer", "student support officer",
        "education consultant", "student consultant", "admissions counselor", "student counselor",
        "school administrative assistant", "education assistant",
        
        # --- Education Management & Institutional Research ---
        "education manager", "head of education", "director of education", "training director",
        "academic director", "school director", "education program manager", "curriculum director",
        "education researcher", "academic researcher", "curriculum researcher", "assessment specialist","student Admission",
        "educational psychologist"
    ],
    "weight_2": [
        # --- Core Pedagogical Methodologies, Instruction & Training Frameworks ---
        "teaching & pedagogy", "subject knowledge", "curriculum development", "assessment & evaluation",
        "training delivery", "instructional design", "academic administration", "classroom management",
        "lesson planning", "educational leadership", "student engagement", "adult learning principles",
        "andragogy", "blended learning", "formative assessment", "summative assessment", "syllabus design",
        "educational technology", "special educational needs", "individualized education program", "iep",
        "student counseling", "academic grading", "test construction", "educational research methods",
        "courseware development", "microlearning", "gamification of learning", "addie model", "kirkpatrick model"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "academic coordinator", "curriculum coordinator", "training coordinator", "project coordinator",
        "operations coordinator", "education coordinator", "course coordinator", "program coordinator","work study",

        # --- E-Learning Technical Platforms, Authoring Tools & Software ---
        "lms", "learning management system", "moodle", "canvas lms", "blackboard", "google classroom",
        "articulate storyline", "adobe captivate", "camtasia", "zoom rooms", "microsoft teams",
        "h5p", "scorm", "tin can api", "xapi", "vark model", "bloom's taxonomy", "proctoring software",
        "turnitin", "student information systems", "sis", "academic indexing", "google scholar","Supervisor",
    ]
})

#hospitality 
add_field_rules("hospitality & food & beverage", {
    "weight_3": [
        # --- Hotel, Front Office & Reservations Operations ---
        "hotel manager", "assistant hotel manager", "front office manager", "front office executive","hotel",
        "front desk executive", "receptionist", "guest relations officer", "guest service agent","house keeper","house keepers",
        "concierge", "reservation agent", "reservation executive", "duty manager", "night auditor","chef","beverage","food & beverage",
        "restaurant","waiters","hotels","hotel management","f & b","f&b","housekeeping","housekeepers","front office","catering",
        
        # --- Housekeeping & Environmental Services ---
        "housekeeping manager", "assistant housekeeping manager", "housekeeping supervisor",
        "room attendant", "housekeeper", "laundry attendant", "public area attendant", "linen supervisor",
        "Reservations", "Booking Agent", "Front Office", "Guest Relations", "Travel Consultant","culinary","tea room","tea rooms","tea shop","tea shops",
        
        # --- Food & Beverage Service ---
        "food & beverage manager", "f&b manager", "assistant food & beverage manager", "assistant f&b manager",
        "restaurant manager", "assistant restaurant manager", "restaurant supervisor", "waiter", "waitress", "server",
        "steward", "senior steward", "bartender", "bar supervisor", "barista", "café supervisor",
        "banquet manager", "banquet supervisor", "room service attendant","Mixologist","Mixologists","Mixology","bar manager",
        
        # --- Kitchen & Culinary Operations ---
        "executive chef", "head chef", "sous chef", "chef de partie", "commis chef", "kitchen assistant",
        "cook", "pastry chef", "bakery chef", "baker", "butcher", "kitchen steward", "kitchen supervisor",
        
        # --- Hospitality Administration, Sales & Event Strategy ---
        "hospitality manager", "hotel operations manager", "resort manager", "food service manager",
        "catering manager", "event manager", "banquet sales manager", "catering executive",
        "catering supervisor", "wedding planner", "sales executive", "revenue manager",
        "revenue analyst", "marketing executive", "reservations sales executive",
        "business development manager", "hotel administrator", "hospitality administrator",
        "accounts assistant",
        
        # --- Executive Hospitality Leadership ---
        "general manager", "operations manager", "area hotel manager", "cluster hotel manager",
        "director of operations", "chief hospitality officer"
    ],
    "weight_2": [
        # --- Core Service Delivery, Guest Relations & Culinary Standards ---
        "customer service", "food preparation", "food safety", "hotel operations", "guest handling",
        "front office management", "event coordination", "reservation systems", "guest relations",
        "banquet operations", "fine dining", "culinary arts", "menu planning", "haccp",
        "table service", "mixology", "barista skills", "room layout design", "housekeeping standards",
        "laundry management", "night audit procedures", "concierge services", "upselling techniques",
        "table setting", "food portions control", "beverage inventory control", "catering logistics",
        "guest satisfaction tracking", "yield management", "room forecasting"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "event coordinator", "banquet coordinator", "conference coordinator", "front office coordinator",
        "guest services coordinator", "hospitality coordinator", "project coordinator", "operations coordinator",

        # --- Property Management Systems (PMS), Technical Softwares & Operational Metrics ---
        "opera pms", "opera cloud", "fidelio", "amadeus", "sabre", "pos systems", "point of sale",
        "micros pos", "square pos", "clover pos", "open-table", "resdiary", "channel managers",
        "revpar", "revenue per available room", "adr", "average daily rate", "gopopar", "occupancy rate",
        "food cost percentage", "beverage cost analysis", "complaint resolution", "wine pairing",
        "servsafe certification", "food handler permit", "first aid certification"
    ]
})

#legal and compliance
add_field_rules("legal & compliance", {
    "weight_3": [
        # --- Lawyer & Legal Practice Roles ---
        "lawyer", "attorney", "advocate", "legal counsel", "senior legal counsel","legal","compliance",
        "junior lawyer", "associate lawyer", "corporate lawyer", "litigation lawyer",
        "in-house counsel", "legal advisor", "legal consultant",
        
        # --- Legal Support & Paralegal Roles ---
        "legal assistant", "legal executive", "legal officer", "paralegal",
        "legal secretary", "legal clerk", "court clerk", "legal research assistant",
        
        # --- Corporate Legal & Compliance Specialists ---
        "compliance officer", "senior compliance officer", "compliance manager",
        "regulatory compliance officer", "risk & compliance analyst", "risk & compliance manager",
        "ethics & compliance officer", "corporate compliance specialist", "aml compliance officer",
        "kyc officer", "due diligence analyst",
        
        # --- Litigation & Court Administration ---
        "litigation executive", "litigation assistant", "court reporter", "judicial assistant",
        "court administrator",
        
        # --- Risk, Governance & Regulatory Roles ---
        "risk analyst", "risk manager", "governance officer", "internal control officer",
        "regulatory affairs officer", "policy compliance analyst",
        
        # --- Executive Legal Leadership ---
        "head of legal", "legal manager", "senior legal manager", "director of legal affairs",
        "chief legal officer", "clo", "compliance director"
    ],
    "weight_2": [
        # --- Core Legal Knowledge, Documentations & Workflows ---
        "legal research", "contract drafting", "contract management", "regulatory compliance",
        "risk management", "compliance systems", "litigation support", "due diligence",
        "anti-money laundering", "aml", "know your customer", "kyc", "corporate governance",
        "internal controls", "regulatory affairs", "policy analysis", "legal drafting",
        "case management", "statutory interpretation", "intellectual property", "ip law",
        "labor law compliance", "data privacy regulation", "employment law", "dispute resolution",
        "arbitration", "mediation", "legal auditing", "vetting of contracts", "non-disclosure agreements"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "legal case officer", "compliance coordinator", "regulatory coordinator", "project coordinator", 
        "operations coordinator", "coordination officer",

        # --- Legal Platforms, Frameworks & Compliance Standards ---
        "gdpr", "general data protection regulation", "hipaa", "sarbanes-oxley", "sox compliance",
        "basel iii", "dodd-frank", "fcpa", "foreign corrupt practices act", "lexisnexis",
        "westlaw", "clio", "legal tracker", "docuSign", "e-discovery tools", "contract lifecycle management",
        "clm software", "notary public", "bar association", "company secretarial practices"
    ]
})

#design
add_field_rules("design & creative", {
    "weight_3": [
        # --- Graphic Design Roles ---
        "graphic designer", "graphic designers","senior graphic designer", "junior graphic designer","designers","designer",
        "visual designer", "brand designer", "creative designer", "art designer",
        "digital artist", "illustrator",
        "layout designer", "production artist", "pre-press designer", "print designer","3D Visualizer", "3D Designer","3D Visualizers","3D Designers",
        "Render Artist", "Interior Designer", "Graphic Designer","UI/UX",
        
        # --- UI/UX & Product Design Roles ---
        "ui designer", "ux designer", "ui/ux designer", "ui ux designer", "senior ui/ux designer",
        "product designer", "interaction designer", "ux researcher", "ux analyst",
        "ux writer","ui/ux",
        
        # --- Digital, Web & Multimedia Design ---
        "web designer", "front-end designer", "digital designer", "creative web designer",
        "app ui designer", "mobile app designer", "motion graphic designer", "animator",
        "2d animator", "3d animator", "visual effects artist", "vfx artist", "video editor",
        "video producer", "multimedia designer", "motion designer",
        
        # --- Creative, Media & Brand Strategy ---
        "brand manager", "brand strategist", "creative strategist", "content designer",
        "visual communication designer", "photographer", "commercial photographer",
        "videographer", "photo editor", "visual content creator",
        
        # --- Specialized Fashion & Industrial Design ---
        "fashion designer", "textile designer", "interior designer", "industrial designer",
        "furniture designer",
        
        # --- Executive Creative Leadership ---
        "creative director", "art director", "head of design", "design manager",
        "senior design manager", "chief design officer", "cdo",
    ],
    "weight_2": [
        # --- Core Creative Workflows, UI/UX Principles & Aesthetics ---
        "visual design", "ui/ux principles", "branding", "media production", "typography",
        "color theory", "wireframing", "prototyping", "user research", "usability testing",
        "user flows", "information architecture", "interaction design", "motion graphics",
        "video editing", "3d modeling", "storyboarding", "brand guidelines", "vector illustration",
        "photo retouching", "commercial photography", "digital illustration", "layout design",
        "concept development", "creative strategy", "fashion sketching", "interior space planning"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "design assistant", "creative assistant", "design coordinator", "creative coordinator",
        "project coordinator", "operations coordinator", "media coordinator",

        # --- Graphic Design, Video & UI/UX Design Software Suites ---
        "adobe creative cloud", "photoshop", "illustrator", "indesign", "premiere pro",
        "after effects", "figma", "sketch", "adobe xd", "invision", "zeplin", "blender",
        "maya", "3ds max", "cinema 4d", "final cut pro", "davinci resolve", "canva",
        "coreldraw", "html5", "css3", "javascript", "webflow", "wordpress", "portfolio",
        "behance", "dribbble", "w3c standards", "responsive design"
    ]
})

#customer
add_field_rules("customer service & bpo", {
    "weight_3": [
        # --- Core Customer Support & Assistance Roles ---
        "customer service executive", "senior customer service executive", "customer service officer",
        "customer service assistant", "customer service representative",
        "customer support representative", "customer support executive", "customer care executive",
        "customer care officer", "customer care representative", "help desk executive",
        "help desk analyst", "technical support executive", "technical support engineer",
        "it support specialist", "service desk analyst","bpo","customer care","customer support","call center","call centers",
        
        # --- Call Center & Agent Operations ---
        "call center agent", "call center executive", "call center representative",
        "call center officer", "contact center agent", "contact centre agent",
        "bpo executive", "senior bpo executive", "bpo associate", "kpo analyst",
        "inbound call agent", "outbound call agent", "telemarketing executive",
        "telesales executive",
        
        # --- Client Relations & Experience Management ---
        "client relations executive", "client support officer", "client service executive",
        "customer experience executive", "customer experience manager", "relationship officer",
        "relationship manager",
        
        # --- Support Operations & Workflow Processing ---
        "service desk officer", "support analyst", "operations support executive",
        "crm executive", "crm specialist", "ticketing officer", "complaint handling officer",
        "escalation officer",
        
        # --- Quality, Training & Monitoring Frameworks ---
        "quality analyst", "quality assurance analyst", "quality assurance executive",
        "call quality analyst", "process trainer", "training executive",
        
        # --- Executive Operational Leadership ---
        "customer service manager", "call center manager", "bpo manager",
        "operations manager", "head of customer service", "director of customer experience"
    ],
    "weight_2": [
        # --- Core Service Delivery, Performance Tactics & Call Management ---
        "communication", "call handling", "crm systems", "problem solving", "customer experience",
        "cx management", "technical troubleshooting", "ticket management", "complaint resolution",
        "escalation handling", "inbound customer service", "outbound telemarketing", "telesales",
        "customer retention", "quality monitoring", "call auditing", "process training",
        "sla management", "service level agreements", "customer satisfaction optimization",
        "helpdesk operations", "remote support", "chat support", "email management"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Lead and Coordinator Roles Demoted to Weight 1 ---
        "call center supervisor", "call center team leader", "customer service coordinator",
        "bpo team lead", "project coordinator", "operations coordinator",

        # --- CRM Platforms, Enterprise Helpdesks & Center Metrics ---
        "salesforce crm", "zendesk", "zoho crm", "freshdesk", "jira service management",
        "intercom", "hubspot crm", "avaya", "cisco uccx", "genesys", "ivr systems",
        "kpis", "key performance indicators", "csat", "customer satisfaction score",
        "nps", "net promoter score", "ces", "customer effort score", "fcr", "first contact resolution",
        "aht", "average handling time", "tat", "turnaround time", "qa scorecards", "bpo metrics"
    ]
})

#travel
add_field_rules("travel & tourism", {
    "weight_3": [
        # --- Travel Agency Consulting & Advisors ---
        "travel consultant", "travel agent", "travel executive", "travel advisor",
        "ticketing agent", "air ticketing executive", "air ticketing officer",
        "senior travel consultant", "travel operations executive",
        
        # --- Ticketing & GDS Reservation Operations ---
        "ticketing executive", "ticketing officer", "reservation agent", "reservation executive",
        "airline ticketing agent", "gds agent", "amadeus agent", "galileo agent",
        "airline reservation executive", "hotel reservation executive","air","ticketing",
        
        # --- Tour Operations & Destination Guiding ---
        "tour operator", "tour executive", "tour manager", "tour guide",
        "travel operations manager", "tourism officer", "destination specialist",
        "tourism executive", "hospitality executive",
        
        # --- Airline Ground & Aviation Tourism Staff ---
        "airline customer service agent", "airline ground staff", "airport representative",
        "check-in agent", "cabin crew", "flight attendent", "aviation customer service officer",
        "front office executive", "guest relations officer","front office",
        
        # --- Travel Industry Sales & Marketing ---
        "travel sales executive", "travel sales manager", "tourism sales executive",
        "destination marketing executive", "travel marketing executive",
        "business development executive","air","ticketing",
        # --- Visa Processing & Immigration Compliance ---
        "visa processing officer", "visa consultant", "immigration consultant",
        "travel documentation executive",
        
        # --- Executive Travel Industry Leadership ---
        "travel manager", "tourism manager", "head of travel operations", "director of tourism",
        "airline operations manager", "chief travel officer"
    ],
    "weight_2": [
        # --- Core Booking Systems, Route Management & Sector Knowledge ---
        "ticketing systems", "gds systems", "amadeus", "galileo", "sabre", "customer service",
        "booking systems", "destination knowledge", "airline operations", "hotel operations",
        "visa documentation", "itinerary planning", "tour packaging", "flight booking",
        "hotel reservation handling", "customs regulations", "passport processing", "travel insurance",
        "passenger handling", "ground handling", "airport operations", "crs", "central reservation system",
        "fare calculation", "re-issuance of tickets", "refund processing", "destination marketing",
        "mice operations", "meetings incentives conferences exhibitions", "corporate travel management"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "travel coordinator", "tour coordinator", "banquet coordinator", "event coordinator",
        "project coordinator", "operations coordinator",

        # --- Aggregators, Technical GDS Interfaces & Tourism Frameworks ---
        "ota", "online travel agencies", "expedia affiliate network", "booking.com portal",
        "iata regulations", "international air transport association", "pnr generation",
        "passenger name record", "baggage tracking systems", "fids", "flight information display",
        "b2b travel portals", "hotelbeds", "tbo academy", "visa tracking systems", "travel vouchers"
    ]
})

#science and security
add_field_rules("science & research", {
    "weight_3": [
        # --- Core Research Scientist Roles ---
        "research scientist", "senior research scientist", "junior researcher",
        "research associate", "research assistant", "scientific research officer",
        "laboratory research scientist", "applied research scientist", "experimental scientist",
        "merl coordinator", "merl officer", "monitoring and evaluation officer",
        "monitoring evaluation officer", "m&e officer", "evaluation officer",
        "monitoring evaluation research learning","research & development","research and development",
        
        # --- Laboratory, Analyst & Technical Roles ---
        "lab technician", "senior lab technician", "laboratory assistant",
        "laboratory analyst", "research technician", "clinical research technician",
        
        # --- Environmental, Biological & Field Sciences ---
        "environmental scientist", "environmental officer", "ecologist", "marine biologist",
        "wildlife biologist", "agronomist", "soil scientist", "geologist", "hydrologist",
        "field researcher",
        
        # --- Data Science, Statistics & Analytics (Research Focus) ---
        "statistical analyst", "biostatistician", "research data analyst",
        "data scientist", "quantitative analyst",
        
        # --- Academic Track & Institutional Research ---
        "academic researcher", "university research assistant", "phd researcher",
        "postdoctoral researcher", "research fellow", "lecturer", "professor",
        
        # --- Administration & Regulatory Support ---
        "research project officer", "research documentation officer", "grant officer",
        "research administrator",
        
        # --- Strategic Research Leadership ---
        "head of research", "research manager", "senior research manager",
        "director of research", "chief research officer"
    ],
    "weight_2": [
        # --- Core Scientific Methodologies & Workflows ---
        "experimentation", "data analysis", "lab work", "academic research", "field studies",
        "statistical methods", "scientific writing", "literature review", "hypothesis testing",
        "quantitative research", "qualitative research", "sample preparation", "microscopy",
        "chromatography", "spectroscopy", "data collection", "peer review", "grant writing",
        "clinical trial protocols", "gcp compliance", "good clinical practice", "laboratory safety",
        "biostatistics", "experimental design", "rd capabilities", "research development",
        "merl", "monitoring and evaluation", "monitoring evaluation",
        "monitoring evaluation research and learning", "research and learning",
        "impact evaluation", "program evaluation", "project evaluation", "evaluation research"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "research coordinator", "clinical research coordinator", "project coordinator",
        "operations coordinator", "data analyst", "m&e", "monitoring officer",
        "evaluation coordinator",

        # --- Scientific Software, Statistical Packages & Equipment Systems ---
        "spss", "sas software", "r programming", "matlab", "python for data science",
        "stata", "laboratory information management system", "lims", "eln", "electronic lab notebook",
        "ncbi", "pubmed", "h-index", "latex formatting", "irb approval", "institutional review board",
        "p-value calculation", "anova testing", "regression modeling", "elisa assay", "pcr techniques"
    ]
})

#project management
add_field_rules("project & business management", {
    "weight_3": [
        # --- Professional Project Management Execution ---
        "project manager", "senior project manager", "junior project manager",
        "assistant project manager", "project executive", "project officer",
        "program officer", "programme officer", "program coordinator", "programme coordinator",
        "project assistant", "technical project manager", "it project manager",
        "construction project manager", "agile project manager","Business Strategy", "Business Development Manager", 
        "Corporate Planning", "Strategic Planning","Business Excellence", "Process Improvement", "Lean", "Six Sigma", 
        "Continuous Improvement","field officer",
        
        # --- Program, Portfolio & PMO Operations ---
        "program manager", "senior program manager", "portfolio manager",
        "portfolio analyst", "pmo manager", "project management office manager", "pmo analyst",
        
        # --- Business, Systems & Requirements Analysis ---
        "business analyst", "senior business analyst", "junior business analyst",
        "technical business analyst", "product analyst", "systems analyst", "requirements analyst",
        
        # --- Corporate Strategy, Planning & Growth ---
        "business strategy analyst", "strategic planner", "corporate strategy analyst",
        "operations analyst", "planning officer", "business planning manager", "growth analyst","Business Analysist",
        
        # --- Modern Agile Delivery Frameworks ---
        "scrum master", "agile coach", "product owner", "delivery manager",
        "release manager", "change manager",
        "Entrepreneur", "Executive", "Business Development", "Strategic Lead",
        
        # --- Business Operations & Execution ---
        "operations manager", "assistant operations manager", "operations executive",
        "business operations manager", "service delivery manager", "process manager",
        "project control officer", "risk manager", "risk analyst", "quality manager",
        "governance officer", "compliance project manager",
        
        # --- Executive Business Leadership ---
        "general manager", "assistant general manager", "head of operations",
        "head of business development", "director of operations", "director of projects",
        "chief operating officer", "coo", "chief executive officer", "ceo", "chief strategy officer", "cso",
    ],
    "weight_2": [
        # --- Core Delivery Methodologies, Strategy & Governance ---
        "planning", "execution", "leadership", "budgeting", "coordination", "stakeholder management",
        "agile methodologies", "scrum framework", "waterfall methodology", "project lifecycle",
        "scope management", "resource allocation", "risk mitigation", "business analysis",
        "requirements gathering", "strategic planning", "change management models", "pmp principles",
        "prince2", "business process mapping", "gap analysis", "swimlane diagrams", "user stories",
        "sprint planning", "backlog grooming", "kpi tracking", "milestone tracking", "vendor management",
        "financial budgeting", "cost benefit analysis", "pmo governance"
    ],
    "weight_1": [
        # --- Fluid / Cross-Functional Coordinator Roles Demoted to Weight 1 ---
        "project coordinator", "program coordinator", "pmo coordinator", "operations coordinator",
        "coordination officer",

        # --- Management Software, Enterprise Tooling & Documentation Frameworks ---
        "jira", "confluence", "trello", "asana", "monday.com", "microsoft project", "ms project",
        "smartsheet", "basecamp", "visio", "lucidchart", "draw.io", "scrumboard", "kanban board",
        "raci matrix", "swot analysis", "slas", "service level agreements", "okrs",
        "objectives and key results", "gantt charts", "earned value management", "evm", "brm",
    ]
})

#others
add_field_rules("general labor & manual work", {
    "weight_3": [
        # --- General Labor & Manual Operations ---
        "laborer","laborers", "labourer", "general worker", "helper", "factory helper", "construction helper",
        "warehouse helper", "cleaner", "office cleaner", "janitor", "maintenance worker",
        "assistant worker", "loading worker", "unloading worker", "loading/unloading worker","welder","welders",
        
        # --- Non-Specialized Delivery & Field Support ---
        "delivery rider", "delivery driver", "driver", "courier", "field assistant", "field worker","house maid","house maids",
        "errand runner","drivers",
        
        # --- Security & Asset Protection ---
        "security guard", "security officer", "senior security officer", "watchman",
        "security assistant",
        "protection officer", "cctv operator",
        
        # --- Basic Technical Support Helpers ---
        "helper technician", "general technician", "maintenance assistant", "repair helper",
        "installation assistant",
        
        # --- Basic Retail & Store Staff ---
        "supermarket helper", "cash assistant", "sales helper",
        
        # --- Warehouse Entry-Level Fulfillment ---
        "packing assistant", "packing worker", "store helper", "inventory helper"
    ],
    "weight_2": [
        # --- Core Manual Executions & Facility Operations ---
        "manual labor", "facility maintenance", "commercial cleaning", "waste disposal",
        "heavy lifting", "loading and unloading", "goods sorting", "order packing",
        "package delivery", "route navigation", "physical security", "patrolling",
        "surveillance monitoring", "access control", "incident reporting", "basic repairs",
        "equipment installation support", "shelf stocking", "inventory counting", "cash handling assistance",
        "errand execution", "workplace housekeeping", "preventative maintenance assistance"
    ],
    "weight_1": [
        # --- Fluid / Highly Volatile Cross-Functional Support Roles Demoted to Weight 1 ---
        "general assistant", "office helper", "support staff", "junior assistant",
        "trainee", "internship", "warehouse assistant", "shop assistant", "store assistant",
        "stock assistant", "field coordinator", "logistics helper",

        # --- Generic Workplace Baseline Terminology & Basic Tools ---
        "time management", "physical fitness", "safety gear compliance", "ppe usage",
        "safety shoes", "high visibility vest", "hand tools usage", "cleaning chemicals safety",
        "cctv software", "basic mathematics", "barcode scanning", "delivery logs",
        "shift work", "overtime availability", "teamwork", "verbal communication"
    ]
})

