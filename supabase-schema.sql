-- SEO Rank Tracker Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  domain TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, domain)
);

-- Keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(site_id, keyword)
);

-- Rank checks table
CREATE TABLE IF NOT EXISTS rank_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword_id UUID NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  rank INTEGER,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sites_user_id ON sites(user_id);
CREATE INDEX IF NOT EXISTS idx_keywords_site_id ON keywords(site_id);
CREATE INDEX IF NOT EXISTS idx_rank_checks_keyword_id ON rank_checks(keyword_id);
CREATE INDEX IF NOT EXISTS idx_rank_checks_checked_at ON rank_checks(checked_at DESC);

-- Enable Row Level Security
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for sites
CREATE POLICY "Users can view their own sites"
  ON sites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sites"
  ON sites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sites"
  ON sites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sites"
  ON sites FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for keywords
CREATE POLICY "Users can view keywords for their sites"
  ON keywords FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = keywords.site_id
    AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert keywords for their sites"
  ON keywords FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = keywords.site_id
    AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete keywords for their sites"
  ON keywords FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = keywords.site_id
    AND sites.user_id = auth.uid()
  ));

-- Create policies for rank_checks
CREATE POLICY "Users can view rank checks for their keywords"
  ON rank_checks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM keywords
    JOIN sites ON sites.id = keywords.site_id
    WHERE keywords.id = rank_checks.keyword_id
    AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert rank checks for their keywords"
  ON rank_checks FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM keywords
    JOIN sites ON sites.id = keywords.site_id
    WHERE keywords.id = rank_checks.keyword_id
    AND sites.user_id = auth.uid()
  ));
