import re
from typing import Dict, List, Set, Tuple

class JobMatcher:
    def __init__(self, client_profile: Dict):
        """
        Initialize with a client profile.
        Expected keys: 'name', 'primary_skills', 'secondary_skills', 'experience_years'
        """
        self.client_name = client_profile.get("name", "Client")
        self.primary_skills = {s.lower() for s in client_profile.get("primary_skills", [])}
        self.secondary_skills = {s.lower() for s in client_profile.get("secondary_skills", [])}
        self.client_exp = client_profile.get("experience_years", 0)

    def extract_keywords_from_text(self, text: str, target_keywords: Set[str]) -> Set[str]:
        """Finds target keywords present in the text using word boundaries."""
        found = set()
        text_lower = text.lower()
        for kw in target_keywords:
            # Matches exact words (handles terms like 'C++', 'Node.js', 'React')
            pattern = r'(?:\b|(?<=\W))' + re.escape(kw) + r'(?:\b|(?=\W))'
            if re.search(pattern, text_lower):
                found.add(kw)
        return found

    def evaluate_job(self, job_title: str, job_description: str, required_skills: List[str], min_years_exp: int = 0) -> Dict:
        req_set = {s.lower() for s in required_skills}
        
        # 1. Tech Stack Matching
        matched_primary = self.primary_skills.intersection(req_set)
        matched_secondary = self.secondary_skills.intersection(req_set)
        missing_skills = req_set - (self.primary_skills | self.secondary_skills)

        # Tech Score Calculation (Primary skills are weighted higher)
        total_reqs = len(req_set) if req_set else 1
        tech_score = ((len(matched_primary) * 1.0) + (len(matched_secondary) * 0.5)) / total_reqs
        tech_score = min(tech_score * 100, 100.0)

        # 2. Experience Match
        exp_score = 100.0 if self.client_exp >= min_years_exp else (self.client_exp / min_years_exp * 100 if min_years_exp > 0 else 100.0)

        # 3. Weighted Final Score (70% Tech Stack, 30% Experience)
        final_score = round((tech_score * 0.7) + (exp_score * 0.3), 1)

        # Recommendation Tier
        if final_score >= 80:
            recommendation = "Strong Apply - High Match"
        elif final_score >= 60:
            recommendation = "Tailor Resume - Moderate Match"
        else:
            recommendation = "Skip - Low Match"

        return {
            "job_title": job_title,
            "match_score": f"{final_score}%",
            "recommendation": recommendation,
            "matched_primary": [s.title() for s in matched_primary],
            "matched_secondary": [s.title() for s in matched_secondary],
            "missing_skills": [s.title() for s in missing_skills],
            "exp_status": f"Client: {self.client_exp} yrs | Required: {min_years_exp} yrs"
        }

# ==========================================
# TEST DRIVE / EXAMPLE USAGE
# ==========================================
if __name__ == "__main__":
    # Define your Client's Profile
    client = {
        "name": "Alex Smith",
        "experience_years": 5,
        "primary_skills": ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
        "secondary_skills": ["Docker", "AWS", "GraphQL", "Git", "Jest"]
    }

    # Job Posting Details
    job_title = "Senior Full Stack Engineer"
    job_skills_required = ["React", "TypeScript", "Node.js", "PostgreSQL", "Kubernetes", "Redis", "AWS"]
    job_min_exp = 4

    job_description_sample = """
    We are looking for a Senior Full Stack Engineer with strong experience in React, TypeScript, and Node.js.
    You will work with PostgreSQL and AWS for cloud deployments. Knowledge of Kubernetes and Redis is required.
    """

    # Run Evaluator
    matcher = JobMatcher(client)
    results = matcher.evaluate_job(job_title, job_description_sample, job_skills_required, min_years_exp=job_min_exp)

    # Print Results
    print(f"\n--- MATCH REPORT FOR {client['name'].upper()} ---")
    print(f"Role: {results['job_title']}")
    print(f"Match Score: {results['match_score']} ({results['recommendation']})")
    print(f"Experience: {results['exp_status']}")
    print(f"\nMatched Core Skills: {', '.join(results['matched_primary']) if results['matched_primary'] else 'None'}")
    print(f"Matched Secondary Skills: {', '.join(results['matched_secondary']) if results['matched_secondary'] else 'None'}")
    print(f"Missing Skill Gaps: {', '.join(results['missing_skills']) if results['missing_skills'] else 'None'}")
    print("-------------------------------------------\n")
