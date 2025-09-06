# Sanskriti AR - Comprehensive Website Knowledge Base

## Website Overview

**Sanskriti AR** is an innovative digital heritage tourism platform that showcases Odisha's rich cultural heritage through immersive Augmented Reality (AR) technology. The website serves as a bridge between ancient traditions and modern technology, allowing users to explore Odisha's monuments, interact with artisans, earn rewards, and create personalized digital souvenirs.

### Purpose and Mission
- **Primary Goal**: Promote Odisha's cultural heritage through cutting-edge AR technology
- **Target Audience**: Tourists, heritage enthusiasts, students, and culture lovers worldwide
- **Value Proposition**: Experience Odisha's monuments and culture in an immersive, interactive way that transcends physical boundaries
- **Cultural Impact**: Preserve and promote traditional crafts while supporting local artisans

---

## Website Architecture & Technical Stack

### Technology Foundation
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with custom heritage design system
- **UI Components**: Shadcn/UI component library
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router DOM 6.30.1
- **Build Tool**: Vite
- **Animations**: Custom CSS animations with Tailwind classes

### Design System
- **Color Palette**: Heritage-inspired colors including saffron, gold, emerald, and deep indigo
- **Typography**: 
  - Headings: 'Cinzel' serif font for elegant, traditional feel
  - Body: 'Poppins' sans-serif for modern readability
- **Visual Theme**: Gradient backgrounds, golden accents, cultural motifs
- **Animation Style**: Smooth transitions, floating particles, glow effects

---

## Detailed Section-by-Section Analysis

### 1. Hero Section (`/src/components/Hero.tsx`)

**Purpose**: Creates an immersive landing experience showcasing Odisha's iconic monuments

**Visual Features**:
- **Background Carousel**: Rotates between 3 monuments every 5 seconds
  - Konark Sun Temple (UNESCO World Heritage Site)
  - Jagannath Puri Temple 
  - Chilika Lake (Asia's largest brackish water lagoon)
- **Parallax Effects**: Dynamic background movement with depth
- **Floating Particles**: 20 animated golden particles for magical ambiance
- **Gradient Overlays**: Multiple color gradients for visual depth

**Interactive Elements**:
- **Monument Navigation Dots**: 3 clickable dots to manually switch between backgrounds
- **Primary CTA Button**: "Start Virtual Tour" with golden gradient and play icon
- **Secondary CTA Button**: "Explore Artisans" with outline style and camera icon
- **Scroll Indicator**: Animated down arrow encouraging users to scroll

**Content Elements**:
- **Main Title**: "Sanskriti AR" in large gradient text
- **Subtitle**: "Experience Odisha Like Never Before"
- **Tagline**: Descriptive text about AR magic and cultural heritage
- **Monument Indicator**: Shows current monument name with map pin icon

### 2. Konark Temple Section (`/src/components/KonarkTempleSection.tsx`)

**Purpose**: Dedicated showcase for the Konark Sun Temple AR experience

**Key Features**:
- **UNESCO Badge**: Prominent heritage site designation
- **AR Experience Features Grid**:
  - 3D Heritage: Detailed 3D reconstructions
  - Time Travel: See ancient glory restored
  - Interactive Stories: Rich historical narratives
- **External AR Link**: Direct connection to MyWebAR platform
- **Educational Content**: Historical context and architectural significance

**Visual Design**:
- **Hero Image**: High-quality Konark temple photograph
- **Gradient Overlays**: Saffron and gold accents matching temple aesthetics
- **Floating Particles**: Subtle animated elements
- **Hover Effects**: Scale and glow transformations

**Interactive Elements**:
- **Primary AR Button**: "🔍 View in AR" with external link to WebAR experience
- **Decorative Elements**: Corner gradients and visual flourishes
- **Cultural Context Card**: Educational information about temple significance

### 3. AR Experience Section (`/src/components/ARExperience.tsx`)

**Purpose**: Interactive demonstration of AR features and gamified learning

**AR Viewer Interface**:
- **Live AR Simulation**: Mock AR interface with temple imagery
- **Time Slider**: Interactive control to see monuments across different eras
  - Range: Present day (2024) to 13th-16th centuries
  - Visual Effects: Sepia filter and brightness adjustment based on time period
- **Language Selection**: Multi-language narration (English, Hindi, Odia)
- **Audio Controls**: Mute/unmute with volume icons
- **Culture Coins Display**: Real-time reward tracking

**Gamification Features**:
- **Interactive Quiz Orb**: Clickable award icon triggers heritage questions
- **Quiz System**: 
  - Multiple choice questions about Odisha heritage
  - Immediate feedback with educational facts
  - Reward system: +10 Culture Coins for correct answers
- **Achievement Tracking**: Visual progress indicators

**Educational Content**:
- **Heritage Questions**: Konark temple construction date, Jagannath temple deity
- **Historical Facts**: Contextual information provided with each answer
- **AR Features Grid**: 4 feature cards explaining AR capabilities

### 4. Artisans Section (`/src/components/ArtisansSection.tsx`)

**Purpose**: Showcase traditional Odisha crafts and support local artisans

**Product Catalog**:
- **Pattachitra Painting**: Traditional cloth paintings with natural pigments (₹2,500)
- **Silver Filigree Jewelry**: Cuttack's renowned metalwork tradition (₹8,900)
- **Temple Stone Sculpture**: Konark-inspired carvings (₹15,000)

**E-commerce Features**:
- **Category Filtering**: All, Painting, Jewelry, Sculpture
- **Product Cards**: High-quality images, artist information, descriptions
- **Rating System**: 5-star display with numerical ratings
- **Stock Status**: In-stock/out-of-stock indicators
- **Wishlist Functionality**: Heart icon for saving favorites
- **Purchase Integration**: Add to cart functionality

**Artisan Support**:
- **Featured Badges**: Highlight exceptional pieces
- **Artist Attribution**: Credit individual artisans and collectives
- **Village Visit CTA**: "Schedule Village Visit" and "Virtual Workshop Tour"
- **Cultural Education**: Detailed descriptions of traditional techniques

### 5. Rewards Section (`/src/components/RewardsSection.tsx`)

**Purpose**: Gamified reward system encouraging cultural exploration

**Achievement System**:
- **Heritage Explorer**: Visit 3 AR monuments (50 coins)
- **Quiz Master**: Answer 10 heritage questions correctly (30 coins)
- **Culture Enthusiast**: Spend 30 minutes exploring (25 coins)
- **Artisan Supporter**: Purchase from local artisans (100 coins)

**Progress Tracking**:
- **Visual Progress Bars**: Real-time completion status
- **Trophy Icons**: Visual indicators for completed achievements
- **Coin Rewards**: Clear incentive structure
- **Completion Badges**: Color-coded status indicators

**Digital Souvenirs Marketplace**:
- **Heritage Certificate**: Personalized completion certificate (50 coins)
- **AR Monument Collection**: Downloadable 3D models (75 coins)
- **Cultural Wallpaper Pack**: High-resolution heritage wallpapers (25 coins)
- **Virtual Museum Pass**: Exclusive exhibition access (100 coins)

**User Experience**:
- **Coin Balance Display**: Prominent golden coin counter
- **Purchase System**: Spend coins to unlock souvenirs
- **Download Functionality**: Access purchased digital items
- **Special Offers**: Limited-time promotional content

### 6. Souvenir Generator (`/src/components/SouvenirGenerator.tsx`)

**Purpose**: AI-powered personalized souvenir creation

**User Input System**:
- **Personal Details**:
  - Full Name (required)
  - Age (required)
  - Email (optional)
  - Phone Number (optional)
- **Photo Upload**: File upload with 5MB limit and image validation
- **Style Selection**: 6 artistic options (Cinematic, Watercolor, Anime, Oil Painting, Vintage Poster, Futuristic)
- **Monument Background**: 3 heritage sites with detailed descriptions
- **Branding Option**: Optional logo inclusion checkbox

**AI Integration**:
- **Webhook Integration**: n8n workflow connection for image generation
- **Dynamic Prompt Generation**: AI prompt automatically created based on user inputs
- **Real-time Preview**: Shows generated AI prompt before submission
- **Error Handling**: Comprehensive error messages and loading states

**Monument Options**:
- **Konark Sun Temple**: UNESCO World Heritage Site with chariot architecture
- **Jagannath Temple**: Char Dham pilgrimage site with Rath Yatra fame
- **Lingaraj Temple**: Kalinga architecture masterpiece dedicated to Lord Shiva

**Technical Features**:
- **Base64 Image Conversion**: Client-side image processing
- **JSON Payload**: Structured data transmission to backend
- **Loading States**: Visual feedback during processing
- **Download Functionality**: Direct image download upon completion
- **Form Validation**: Required field checking and file type validation

### 7. Footer Section (`/src/components/Footer.tsx`)

**Purpose**: Site navigation, contact information, and legal details

**Navigation Links**:
- **Explore Section**: Virtual Tours, AR Experience, Artisans & Crafts, Rewards Program
- **Heritage Sites**: Konark Sun Temple, Jagannath Puri Temple, Chilika Lake, Udayagiri Caves
- **Legal Pages**: Privacy Policy, Terms of Service, Accessibility

**Contact Information**:
- **Address**: Tourism Department, Government of Odisha, Bhubaneswar
- **Phone**: +91 674 2345678
- **Email**: info@sanskriti-ar.gov.in
- **Website**: www.odishatourism.gov.in

**Social Media Integration**:
- **Platforms**: Facebook, Twitter, Instagram, YouTube
- **Consistent Branding**: Golden accent colors and hover effects

**Brand Information**:
- **Mission Statement**: Connecting past and present through AR technology
- **Copyright Notice**: © 2024 Sanskriti AR - Odisha Tourism Experience
- **Development Credit**: Promotes Odisha's cultural heritage through innovation

---

## Interactive Elements & Functionality

### Button Interactions
1. **Start Virtual Tour** (Hero): Primary CTA with golden gradient and play icon
2. **Explore Artisans** (Hero): Secondary CTA with camera icon
3. **View in AR** (Konark): External link to MyWebAR platform with sun icon
4. **Quiz Interaction** (AR Experience): Award icon triggers heritage questions
5. **Category Filters** (Artisans): Toggle between craft categories
6. **Purchase Buttons** (Artisans): E-commerce integration with cart icon
7. **Schedule Village Visit** (Artisans): CTA for physical artisan visits
8. **Download Souvenir** (Rewards): Access purchased digital items
9. **Generate Souvenir** (Generator): AI processing trigger
10. **Social Media Links** (Footer): External social platform connections

### Dynamic Content
- **Monument Carousel**: Auto-rotating background images every 5 seconds
- **Time Slider**: Visual timeline affecting monument appearance
- **Progress Bars**: Real-time achievement completion tracking
- **Culture Coins Counter**: Dynamic reward balance display
- **AI Prompt Preview**: Real-time prompt generation based on user inputs
- **Stock Status**: Live inventory updates for artisan products

### Responsive Design
- **Mobile Optimization**: Touch-friendly interfaces and responsive layouts
- **Tablet Adaptation**: Grid layouts adjust for medium screen sizes
- **Desktop Enhancement**: Full feature access with hover effects
- **Cross-browser Compatibility**: Modern browser support with fallbacks

---

## Content Management & SEO

### SEO Implementation
- **Meta Tags**: Comprehensive title and description optimization
- **Semantic HTML**: Proper heading hierarchy (H1, H2, H3, H4)
- **Alt Text**: Descriptive image alternatives for accessibility
- **Structured Data**: Heritage site and cultural content markup
- **Clean URLs**: SEO-friendly navigation structure
- **Mobile-First Design**: Google's mobile-first indexing compliance

### Content Strategy
- **Cultural Education**: Rich historical context for each monument
- **Artisan Stories**: Personal narratives and traditional techniques
- **Interactive Learning**: Gamified heritage education approach
- **Visual Storytelling**: High-quality imagery and graphic design
- **Multi-language Support**: English, Hindi, and Odia content options

---

## Technical Integration Points

### External Services
- **MyWebAR Platform**: AR experience hosting at mywebar.com
- **n8n Webhook Integration**: AI souvenir generation workflow
- **Image Processing**: Client-side base64 conversion and validation
- **File Download System**: Direct download functionality for digital souvenirs

### Performance Optimization
- **Lazy Loading**: Images load on demand for faster initial page load
- **Code Splitting**: Component-based architecture for efficient bundling
- **Optimized Images**: Compressed heritage site photography
- **CSS Animations**: Hardware-accelerated transitions and effects

### Analytics & Tracking
- **User Journey Mapping**: Track progression through cultural experiences
- **Engagement Metrics**: Time spent in AR experiences and quiz completion
- **Conversion Tracking**: Artisan product purchases and souvenir generation
- **Cultural Impact Measurement**: Heritage learning and appreciation metrics

---

## Cultural Context & Educational Value

### Heritage Preservation
- **Digital Documentation**: 3D models preserve architectural details
- **Traditional Craft Promotion**: Direct artisan support and sales
- **Cultural Storytelling**: Interactive narratives preserve oral traditions
- **Youth Engagement**: Modern technology attracts younger audiences

### Educational Objectives
- **Historical Accuracy**: Verified information about monuments and traditions
- **Interactive Learning**: Hands-on exploration through AR and quizzes
- **Cultural Appreciation**: Deep dive into Odisha's artistic heritage
- **Tourism Promotion**: Encourage physical visits to heritage sites

### Community Impact
- **Artisan Economic Support**: Direct sales channel for traditional crafts
- **Heritage Awareness**: Increased appreciation for Odisha's cultural wealth
- **Technology Integration**: Showcase of innovative heritage presentation
- **Global Accessibility**: Worldwide access to Odisha's cultural treasures

This knowledge base serves as a comprehensive reference for understanding the Sanskriti AR website's structure, functionality, and cultural significance. It can be used by LLM models to provide accurate information about the platform's features, content, and objectives.