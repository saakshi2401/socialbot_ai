import { Camera, Briefcase, MessageCircle, Globe, Video, Hash, PenTool, Lightbulb, MessageSquareQuote } from 'lucide-react';

export default function RightPanel({ platform, setPlatform, tone, setTone, feature, setFeature }) {
  const platforms = [
    { name: 'Instagram', icon: Camera },
    { name: 'LinkedIn', icon: Briefcase },
    { name: 'Twitter/X', icon: MessageCircle },
    { name: 'Facebook', icon: Globe },
    { name: 'YouTube', icon: Video },
  ];

  const features = [
    { name: 'Caption Generator', icon: PenTool },
    { name: 'Hashtag Generator', icon: Hash },
    { name: 'Reply Generator', icon: MessageSquareQuote },
    { name: 'Content Rewrite', icon: PenTool },
    { name: 'Trending Ideas', icon: Lightbulb },
  ];

  const tones = ['Professional', 'Funny', 'Casual', 'Gen Z', 'Motivational', 'Luxury'];

  return (
    <div className="w-80 bg-surface border-l border-surfaceLight flex flex-col h-full shrink-0 overflow-y-auto hidden md:flex">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-6">Settings</h2>
        
        {/* Platform Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-textMuted mb-3 uppercase tracking-wider">Platform</label>
          <div className="grid grid-cols-2 gap-2">
            {platforms.map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.name}
                  onClick={() => setPlatform(p.name)}
                  className={`flex items-center space-x-2 p-2 rounded-xl border text-sm transition-all ${platform === p.name ? 'border-primary bg-primary/10 text-primary' : 'border-surfaceLight hover:border-textMuted text-textMuted hover:text-textMain'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-textMuted mb-3 uppercase tracking-wider">Tool</label>
          <div className="space-y-2">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <button
                  key={f.name}
                  onClick={() => setFeature(f.name)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all ${feature === f.name ? 'border-primary bg-primary/10 text-primary' : 'border-surfaceLight hover:border-textMuted text-textMuted hover:text-textMain'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-textMuted mb-3 uppercase tracking-wider">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${tone === t ? 'bg-primary text-white border-primary' : 'bg-surfaceLight border-transparent text-textMuted hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
