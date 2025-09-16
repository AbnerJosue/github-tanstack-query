export interface IGithubIssues {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: (Label | Labels2 | Labels3)[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: unknown[];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  type: null;
  active_lock_reason: null;
  draft?: boolean;
  pull_request?: Pullrequest;
  body: string;
  closed_by: User | null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null | string;
  sub_issues_summary?: Subissuessummary;
  issue_dependencies_summary?: Issuedependenciessummary;
}

export enum State { 
  All = "all",
  Close = "closed",
  Open = "open"
}

interface Issuedependenciessummary {
  blocked_by: number;
  total_blocked_by: number;
  blocking: number;
  total_blocking: number;
}

interface Subissuessummary {
  total: number;
  completed: number;
  percent_completed: number;
}

interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface Pullrequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

interface Labels3 {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface Labels2 {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: null | string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: null;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}